import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { joinRoom } from '@/api/rooms';
import localPlayer from '@/api/socket';
import useChatStore from '@/state/chat';
import useRoomStore from '@/state/room';
import useGameStore from '@/state/game';
import useVoteStore from '@/state/vote';
import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';

import useCountdown from './use-countdown';

const useCurrentGame = (roomId: string) => {
  const currentPlayerId = useLocalStore((state) => state.playerId);
  const nickname = useLocalStore((state) => state.nickname);
  const setPlayerId = useLocalStore((state) => state.setPlayerId);
  const setRoom = useRoomStore((state) => state.setRoom);
  const setGame = useGameStore((state) => state.setGame);
  const setToken = useLocalStore((state) => state.setToken);
  const setPlayers = usePlayersStore((state) => state.setPlayers);
  const addChatMessage = useChatStore((state) => state.addChatMessage);
  const resetChatMessages = useChatStore((state) => state.resetChatMessages);
  // const players = usePlayersStore((state) => state.players?.players) || [];
  const setCategoryVoteData = useVoteStore(
    (state) => state.setCategoryVoteData
  );
  const setAllPlayerVotes = useVoteStore((state) => state.setAllPlayerVotes);
  const setVoteCount = useVoteStore((state) => state.setVoteCount);
  const setMyVotes = useVoteStore((state) => state.setMyVotes);
  const setCategoryValues = useLocalStore(
    (state) => state.setCategoryInputValues
  );
  const { countdown, setCountdown } = useCountdown({
    startFrom: 0,
    // onCountdownUpdate: (s) => playTick(),
    // onCountdownFinish: () => playLastTick(),
  });
  const router = useRouter();

  useEffect(() => {
    if (!nickname || !roomId) return;

    // Check for duplicates and pre-vote 5 for them
    const optimizeVotes = (voteData: CategoryVoteData) => {
      const votes: Votes = {};
      const duplicateVotes: { [playerId: string]: string[] } = {};
      for (const playerId in voteData.values) {
        const value = voteData.values[playerId];
        if (value.trim().length !== 0) {
          duplicateVotes[value] = [...(duplicateVotes[value] || []), playerId];
        } else if (playerId !== currentPlayerId) {
          votes[playerId] = 0;
        }
      }
      for (const value in duplicateVotes) {
        const players = duplicateVotes[value];
        if (players.length > 1) {
          players.forEach((playerId) => {
            if (playerId !== currentPlayerId) {
              votes[playerId] = 5;
            }
          });
        }
      }
      return votes;
    };

    joinRoom(nickname, roomId).then(
      ({ playerId, authToken, error, roomOptions, errorCode }) => {
        if (error) return toast.error(`Error #${errorCode}: ${error}`);
        if (!authToken) return toast.error('Unable to find auth token.');
        resetChatMessages();
        setToken(authToken);
        setRoom({ id: roomId, options: roomOptions });
        setPlayerId(playerId);
        // Detach event handler and disconnect
        localPlayer.offAll();
        localPlayer.disconnect();

        const doAuth = () => {
          localPlayer.authenticate(
            { authToken, nickname, roomId: roomId, game: 'word' },
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

        // When server requests category values
        localPlayer.onRequestValues((callback) => {
          const categoryValues = useLocalStore.getState().categoryInputValues;
          callback(categoryValues);
          setCountdown(3);
        });

        // Votes
        localPlayer.onStartVote((categoryData) => {
          const optimizedVotes = optimizeVotes(categoryData);
          setCategoryVoteData(categoryData);
          setVoteCount(0);
          setAllPlayerVotes(null);
          setMyVotes(optimizedVotes);
          localPlayer.sendVotes(optimizedVotes);
        });

        localPlayer.onUpdateVotedCount((voteCount) => {
          setVoteCount(voteCount);
        });

        localPlayer.onPlayerVotes((votes) => {
          setAllPlayerVotes(votes);
          if (currentPlayerId && votes[currentPlayerId]) {
            setMyVotes(votes[currentPlayerId]);
          }
        });

        // Timer
        localPlayer.onStartTimer((newCountdown) => {
          setCountdown(newCountdown);
          setCategoryValues({});
        });

        // Local player kicked
        localPlayer.onKick((kickMsg) => {
          toast.error(kickMsg);
          router.push('/word');
        });

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
    setPlayerId,
    resetChatMessages,
    setCountdown,
    setCategoryValues,
    setCategoryVoteData,
    setVoteCount,
    setAllPlayerVotes,
    setMyVotes,
    currentPlayerId,
    router,
  ]);

  return { countdown };
};

export default useCurrentGame;
