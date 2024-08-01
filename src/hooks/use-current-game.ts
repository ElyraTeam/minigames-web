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
import { WordSound } from '@/config/word';
import usePlayersStore from '@/state/players';

import useCountdown from './use-countdown';
import useWordSound from './use-word-sound';

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
  const addNewMessage = useChatStore((state) => state.addNewMessage);
  const clearNewMessages = useChatStore((state) => state.clearNewMessages);
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
  const [playChatSound] = useWordSound(WordSound.CHAT);
  const [playAfterWrite] = useWordSound(WordSound.AFTER_WRITE);
  const [playTick] = useWordSound(WordSound.TIMER_TICK);
  const [playLastTick] = useWordSound(WordSound.TIMER_END);
  const { countdown, setCountdown } = useCountdown({
    startFrom: 0,
    onCountdownUpdate: (s) => playTick(),
    onCountdownFinish: () => playLastTick(),
  });
  const router = useRouter();

  useEffect(() => {
    if (!nickname || !roomId) return;

    joinRoom(nickname, roomId).then(
      ({ playerId, authToken, error, roomOptions, errorCode }) => {
        if (error) {
          toast.error(`Error #${errorCode}: ${error}`);
          return router.push('/word');
        }
        if (!authToken) {
          toast.error('Unable to find auth token.');
          return router.push('/word');
        }
        resetChatMessages();
        clearNewMessages();
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
        localPlayer.onChat((msg) => {
          addChatMessage(msg);
          addNewMessage();
          playChatSound();
        });

        // When server requests category values
        localPlayer.onRequestValues((callback) => {
          const categoryValues = useLocalStore.getState().categoryInputValues;
          callback(categoryValues);
          setCountdown(3);
          playAfterWrite();
        });

        // Votes
        localPlayer.onStartVote((categoryData) => {
          setCategoryVoteData(categoryData);
          setVoteCount(0);

          const votes = categoryData.votes;
          const myVotes = useVoteStore.getState().myVotes;
          setAllPlayerVotes(votes);
          if (currentPlayerId && votes[currentPlayerId]) {
            setMyVotes({ ...myVotes, ...votes[currentPlayerId] });
          }
        });

        localPlayer.onUpdateVotedCount((voteCount) => {
          setVoteCount(voteCount);
        });

        localPlayer.onPlayerVotes((votes) => {
          const myVotes = useVoteStore.getState().myVotes;
          setAllPlayerVotes(votes);
          if (currentPlayerId && votes[currentPlayerId]) {
            setMyVotes({ ...myVotes, ...votes[currentPlayerId] });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
