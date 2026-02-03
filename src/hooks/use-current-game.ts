import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useUIStore from '@/state/ui';
import { State } from '@/types/word';
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
  const setWinners = useGameStore((state) => state.setWinners);
  const setWinnersOpen = useUIStore((state) => state.setWinnersOpen);
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
  const [playWinnerSound] = useWordSound(WordSound.AFTER_WIN);
  const [playLoseSound] = useWordSound(WordSound.AFTER_LOSE);
  const { countdown, setCountdown } = useCountdown({
    startFrom: 0,
    onCountdownUpdate: (s) => {
      const state = useGameStore.getState().game?.state;
      if (state && (state === State.LOBBY || state === State.INGAME)) {
        playTick();
      }
    },
    onCountdownFinish: () => {
      const state = useGameStore.getState().game?.state;
      if (state && (state === State.LOBBY || state === State.INGAME)) {
        playLastTick();
      }
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (!nickname || !roomId) return;

    joinRoom(nickname, roomId).then(
      ({ playerId, authToken, error, roomOptions, errorCode }) => {
        if (error) {
          toast.error(`Error #${errorCode}: ${error}`);
          return router.push('/');
        }
        if (!authToken) {
          toast.error('Unable to find auth token.');
          return router.push('/');
        }
        setWinners(null);
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
        localPlayer.socket.on('sync', (sync: GameSync) => {
          const prevState = useGameStore.getState().game?.state;
          setGame(sync);
          if (sync.state === State.INGAME && prevState !== State.INGAME) {
            setCategoryValues({});
          }
        });
        localPlayer.socket.on('options', (options: GameOptionsSync) =>
          setRoom(options)
        );
        localPlayer.socket.on('players', (players: GamePlayersSync) =>
          setPlayers(players)
        );

        // Alert
        localPlayer.onAlert((msg, severity) => {
          if (severity == "error" || severity == "warning") {
            return toast.error(msg);
          }
          return toast.success(msg);
        });

        // Chat
        localPlayer.onChat((msg) => {
          addChatMessage(msg);
          if (msg.type !== 'system') {
            addNewMessage();
          }
          playChatSound();
        });

        // When server requests category values
        localPlayer.onRequestValues((callback) => {
          setWinners(null);
          const categoryValues = useLocalStore.getState().categoryInputValues;
          callback(categoryValues);
          setCountdown(3);
          playAfterWrite();
        });

        // Votes
        localPlayer.onStartVote((categoryData) => {
          setCategoryVoteData(categoryData);
          setVoteCount(0);
          setMyVotes({});

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
          router.push('/');
        });

        // Game over
        localPlayer.onGameOver((winners) => {
          setWinners(winners);
          setWinnersOpen(true);
          if (currentPlayerId === winners[0].sessionId) {
            playWinnerSound();
          } else {
            playLoseSound();
          }
        });

        // Connect
        localPlayer.socket.on('connect', doAuth);
        // Ensure socket auth token is current before connecting
        const currentHttpToken = useLocalStore.getState().httpToken;
        localPlayer.socket.auth = { token: currentHttpToken };
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
