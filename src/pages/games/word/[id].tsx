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
import { resetData, setToken } from '../../../state/reducers/local';
import { setRoom } from '../../../state/reducers/room';
import WordTimer from '../../../components/words/WordTimer';
import WordBottomLink from '../../../components/words/shared/WordBottomLink';
import WordTop from '../../../components/words/WordTop';
import WordGame from '../../../components/words/WordGame';
import { State } from '../../../models/game';
import { addChatMessage } from '../../../state/reducers/chat';

const WordGamePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const game = useAppSelector((state) => state.gameSlice);
  const [isLoading, setLoading] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [lobbyMessage, setLobbyMessage] = useState<string>('');

  let nickname = 'User' + (Math.floor(Math.random() * 100) + 1);
  if (typeof window !== 'undefined') {
    nickname =
      localStorage.getItem('nickname') ||
      'User' + (Math.floor(Math.random() * 100) + 1);
    localStorage.setItem('nickname', nickname);
  }

  useEffect(() => {
    if (countdown != 0) {
      startLocalTimer();
    } else {
      setTimerRunning(false);
    }
  }, [countdown]);

  //join room
  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (id) {
        joinRoom(nickname, id as string).then(
          ({ authToken, roomOptions, error }) => {
            if (!authToken && error) {
              setLobbyMessage(error);
              return;
            }
            dispatch(setToken(authToken!));
            dispatch(setRoom({ id: id as string, options: roomOptions }));

            localPlayer.onChat((msg) => {
              dispatch(addChatMessage(msg));
            });

            localPlayer.onKick((kickMsg) => {
              dispatch(resetData());
              setLobbyMessage(kickMsg);
            });

            localPlayer.onStartTimer((countdown) => {
              setTimerRunning(true);
              setCountdown(countdown);
            });

            localPlayer.socket.connect();

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

            if (localPlayer.socket.connected) {
              doAuth();
            } else {
              localPlayer.socket.on('connect', doAuth);
            }
          }
        );
      }
      return () => localPlayer.offAll();
    }, [id]);
  }

  function startLocalTimer() {
    setTimeout(() => {
      const newCountdown = countdown! - 1;
      setCountdown(newCountdown);
    }, 1000);
  }

  function finishRound() {
    localPlayer.finishRound();
  }

  let content = undefined;
  const showLobbyMessage = lobbyMessage != '';
  const isInLobby = !isTimerRunning && !isLoading && game.state != State.INGAME;

  if (showLobbyMessage) {
    content = (
      <p className="text-xl font-bold text-center p-12 h-full flex items-center justify-center">
        {lobbyMessage}
      </p>
    );
  } else if (isTimerRunning) {
    content = <WordTimer countdown={countdown} />;
  } else if (game.state == State.INGAME) {
    content = <WordGame />;
  } else {
    content = <WordLobby nickname={nickname} />;
  }

  const isOwner = game.owner == nickname;

  return (
    <div className="wordgame-main h-screen flex justify-center items-center text-white">
      <Head>
        <title>Word - Game</title>
      </Head>

      {/* {isLoading && <div className="absolute w-full h-full top-0 left-0 bg-primary flex justify-center items-center z-40"><Spinner /></div>} */}

      <WordBackground>
        <div className="main-content-box bg-light sm:px-8 pb-5 pt-3 sm:rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] w-[100%] sm:w-[630px] md:w-[770px] lg:w-[900px] self-center">
          <div>
            <WordTop
              nickname={nickname}
              hideRounds={showLobbyMessage}
              hideShare={showLobbyMessage}
            />

            <div
              className={
                'content-box bg-dark relative rounded-2xl mb-5 mt-3 mx-5 h-[384px] ' +
                (isInLobby ? '' : 'lg:flex') +
                ' lg:items-center lg:pb-0' +
                (game.state == State.INGAME || !showLobbyMessage
                  ? ''
                  : ' scrollbar overflow-y-scroll')
              }
            >
              {content}
            </div>

            {isInLobby && !showLobbyMessage && (
              <WordBottomLink
                onClick={() => localPlayer.startRound()}
                disabled={!isOwner}
                label={isOwner ? 'بدء الجولة' : 'في انتظار منشئ الغرفة'}
              />
            )}

            {game.state == State.INGAME && !isTimerRunning && (
              <button
                className="finish-button bg-[#1a8b90] hover:bg-[#12595c] text-white py-2 px-5 rounded-3xl"
                onClick={finishRound}
              >
                !انتهيت
              </button>
            )}
          </div>
        </div>
      </WordBackground>
    </div>
  );
};

export default WordGamePage;
