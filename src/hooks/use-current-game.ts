import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { joinRoom } from '@/api/rooms';
import localPlayer from '@/api/socket';
import useChatStore from '@/state/chat';
import useRoomStore from '@/state/room';
import useGameStore from '@/state/game';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';

const useCurrentGame = (roomId: string) => {
  const nickname = useLocalStore((state) => state.nickname);
  const setRoom = useRoomStore((state) => state.setRoom);
  const setGame = useGameStore((state) => state.setGame);
  const setToken = useLocalStore((state) => state.setToken);
  const setPlayers = usePlayersStore((state) => state.setPlayers);
  const addChatMessage = useChatStore((state) => state.addChatMessage);

  useEffect(() => {
    if (!nickname || !roomId) return;
    joinRoom(nickname, roomId).then(
      ({ authToken, error, roomOptions, errorCode }) => {
        if (error) return toast.error(`Error #${errorCode}: ${error}`);
        if (!authToken) return toast.error('Unable to find auth token.');
        setToken(authToken);
        setRoom({ id: roomId, options: roomOptions });

        // Detach event handler and disconnect
        localPlayer.offAll();
        localPlayer.disconnect();

        const doAuth = () => {
          localPlayer.authenticate(
            { authToken, nickname, roomId: roomId },
            (res) => {
              // if (res == 'good') {
              // }
            }
          );
        };

        // Sync
        localPlayer.socket.on('sync', (sync: GameSync) => setGame(sync));
        localPlayer.socket.on('options', (options: GameOptionsSync) =>
          setRoom(options)
        );
        localPlayer.socket.on('players', (players: GamePlayersSync) =>
          setPlayers(players)
        );

        // Chat
        localPlayer.onChat((msg) => addChatMessage(msg));

        // Connect
        localPlayer.socket.on('connect', doAuth);
        localPlayer.socket.connect();
      }
    );

    return () => {
      localPlayer.offAll();
      localPlayer.disconnect();
    };
  }, [
    nickname,
    roomId,
    addChatMessage,
    setToken,
    setRoom,
    setGame,
    setPlayers,
  ]);
};

export default useCurrentGame;
