import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { joinRoom } from '../../../api/rooms';
import localPlayer from '../../../api/socket';
import Spinner from '../../../components/shared/Spinner';
import WordLobby from '../../../components/words/WordLobby';
import WordBackground from '../../../components/words/shared/WordBackground';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import {
  resetData,
  setCategoryInputValues,
  setToken,
} from '../../../state/reducers/local';
import { setRoom } from '../../../state/reducers/room';
import WordTimer from '../../../components/words/WordTimer';
import WordTop from '../../../components/words/WordTop';
import { State } from '../../../models/game';
import { addChatMessage } from '../../../state/reducers/chat';
import WordWaiting from '../../../components/words/WordWaiting';
import useCountdown from '../../../helpers/hooks/useCountdown';
import WordVoting from '../../../components/words/WordVoting';
import { store } from '../../../state/store';
import useNickname from '../../../helpers/hooks/useNickname';
import Footer from '../../../components/shared/Footer';
import WordGameOver from '../../../components/words/WordGameOver';
import AnimatedBackground from '../../../components/shared/AnimatedBackground';
import { CSSTransition } from 'react-transition-group';
import { WORD_GAME_NAME } from '../../../config/word';
import WordContent from '../../../components/words/shared/WordContent';
import WordGame from '../../../components/words/WordGame';
import useSound from 'use-sound';

const WordGamePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const game = useAppSelector((state) => state.gameSlice);
  const players = useAppSelector((state) => state.playersSlice.players);
  const [playCoin] = useSound('/assets/sounds/coin-drop-4.mp3');
  const [playComplete] = useSound('/assets/sounds/coin-drop-4.mp3');
  const [playJoin] = useSound('/assets/sounds/coin-drop-4.mp3');
  const [playFlip] = useSound('/assets/sounds/page-flip-01a.mp3');
  const [isLoading, setLoading] = useState(true);
  const [isWaitingDone, setWaitingDone] = useState(true);
  const { countdown, setCountdown } = useCountdown({
    startFrom: 0,
    onCountdownUpdate: () => playCoin(),
  });
  const [lobbyMessage, setLobbyMessage] = useState<string>('');
  //const [categoryValues, setCategoryValues] = useState<CategoryValues>({});
  const [categoryVoteData, setCategoryVoteData] = useState<CategoryVoteData>();
  const [votes, setVotes] = useState<Votes>({});
  const [allVotes, setAllVotes] = useState<AllPlayersVotes>({});
  const [votedCount, setVotedCount] = useState(0);
  const isTimerRunning = countdown != 0;
  const nickname = useNickname(`/games/word/${id}`);
  const [voted, setVoted] = useState(false);
  const [showVoting, setShowVoting] = useState(true);

  useEffect(() => {
    setVoted(players?.find((p) => p.nickname == nickname)?.voted ?? false);
    playJoin();
  }, [players]);

  //join room
  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (id && nickname && typeof window !== 'undefined') {
        dispatch(resetData());
        joinRoom(nickname, id as string).then(
          ({ authToken, roomOptions, error }) => {
            if (!authToken && error) {
              setLobbyMessage(error);
              return;
            }
            dispatch(setToken(authToken!));
            dispatch(setRoom({ id: id as string, options: roomOptions }));
            // playJoin();

            localPlayer.offAll();
            localPlayer.disconnect();

            localPlayer.onChat((msg) => {
              dispatch(addChatMessage(msg));
            });

            localPlayer.onKick((kickMsg) => {
              dispatch(resetData());
              setLobbyMessage(kickMsg);
            });

            localPlayer.onStartTimer((countdown) => {
              setCountdown(countdown);
              dispatch(setCategoryInputValues({})); //To reset ingame values
            });

            localPlayer.onRequestValues((callback) => {
              setWaitingDone(false);
              const values = store.getState().localSlice.categoryInputValues;
              callback(values);
            });

            localPlayer.onStartVote((categoryData) => {
              setShowVoting(false);
              setTimeout(() => {
                setShowVoting(true);
                playFlip();
                setCategoryVoteData(categoryData);
              }, 1000);
              setVoted(false);
              setVotes({});
            });

            localPlayer.onUpdateVotedCount((count) => {
              setVotedCount(count);
            });

            localPlayer.onPlayerVotes((allVotes) => {
              setAllVotes(allVotes);
              if (
                allVotes[nickname] &&
                (!votes[nickname] || Object.keys(votes[nickname]).length == 0)
              ) {
                delete allVotes[nickname][nickname];
                setVotes(allVotes[nickname]);
              }
            });

            const doAuth = () => {
              localPlayer.authenticate(
                {
                  authToken: authToken!,
                  roomId: id as string,
                  nickname,
                },
                (res) => {
                  if (res === 'good') {
                    setLoading(false);
                  } else {
                    //TODO: show error
                  }
                }
              );
            };
            localPlayer.socket.on('connect', doAuth);
            localPlayer.socket.connect();
          }
        );
      }
      return () => localPlayer.offAll();
    }, [id]);
  }

  function confirmVote() {
    setVoted(true);
    localPlayer.confirmVotes();
  }

  let content = (
    <WordContent>
      <Spinner />
    </WordContent>
  );
  const showLobbyMessage = lobbyMessage != '';

  if (showLobbyMessage) {
    content = (
      <WordContent>
        <p
          className="text-xl font-bold text-center p-12 h-full flex items-center justify-center w-full"
          dir="rtl"
        >
          {lobbyMessage}
        </p>
      </WordContent>
    );
  } else if (isTimerRunning) {
    content = (
      <WordContent className="flex justify-center items-center">
        <WordTimer countdown={countdown} />
      </WordContent>
    );
  } else if (game.state == State.INGAME) {
    content = <WordGame />;
  } else if (game.state == State.WAITING || !isWaitingDone) {
    content = (
      <WordWaiting
        stopperNickname={game.stopClicker!}
        isWaitingDone={isWaitingDone}
        onWaitingStart={() => {
          setWaitingDone(false);
          playComplete();
        }}
        onWaitingDone={() => setWaitingDone(true)}
      />
    );
  } else if (game.state == State.VOTING && isWaitingDone && categoryVoteData) {
    content = (
      <CSSTransition timeout={1000} in={showVoting} classNames="fade">
        <WordVoting
          localVotes={votes}
          allVotes={allVotes}
          onVoteChange={(nickname, vote) => {
            setVotes((oldVal) => {
              const newVal = { ...oldVal, [nickname]: vote };
              localPlayer.sendVotes(newVal);
              return newVal;
            });
          }}
          categoryVoteData={categoryVoteData!}
          disableVotes={voted}
          voted={voted}
          confirmVote={confirmVote}
          votedCount={votedCount}
        />
      </CSSTransition>
    );
  } else if (game.state == State.GAME_OVER) {
    content = <WordGameOver />;
  } else if (isLoading) {
    content = (
      <WordContent>
        <Spinner />
      </WordContent>
    );
  } else if (game.state == State.LOBBY) {
    content = <WordLobby />;
  }

  return (
    <div className="wordgame-main h-screen flex justify-center items-center text-white">
      <Head>
        <title>{WORD_GAME_NAME} - Game</title>
      </Head>

      <AnimatedBackground />

      <WordBackground>
        <div className="main-content-box z-40 bg-light sm:px-8 pb-5 pt-3 sm:rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] w-[100%] sm:w-[630px] md:w-[770px] lg:w-[900px] self-center relative">
          <div>
            <WordTop
              nickname={nickname}
              hideRounds={isLoading || showLobbyMessage}
              hideShare={showLobbyMessage}
            />
            {content}
          </div>
        </div>
        <Footer />
      </WordBackground>
    </div>
  );
};

export default WordGamePage;
