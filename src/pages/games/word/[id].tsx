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

const WordGamePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [kickMessage, setKicked] = useState<string>('');

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
        joinRoom(nickname, id as string).then(({ authToken, roomOptions }) => {
          if (!authToken) return; // TODO: show error
          dispatch(setToken(authToken));
          dispatch(setRoom({ id: id as string, options: roomOptions }));

          localPlayer.onChat((msg) => {
            setMessages([...messages, msg]);
          });

          localPlayer.onKick((kickMsg) => {
            dispatch(resetData());
            setKicked(kickMsg);
          });

          localPlayer.onStartTimer((countdown) => {
            setTimerRunning(true);
            setCountdown(countdown);
          });

          localPlayer.socket.connect();

          const doAuth = () => {
            localPlayer.authenticate(
              {
                authToken,
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
        });
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

  let content = <WordLobby nickname={nickname} />;
  const wasKicked = kickMessage != '';
  const isInLobby = !isTimerRunning && !isLoading && game.state != State.INGAME;

  if (wasKicked) {
    content = (
      <p className="text-lg font-bold text-center p-12">{kickMessage}</p>
    );
  } else if (isTimerRunning) {
    content = <WordTimer countdown={countdown} />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (game.state == State.INGAME) {
    content = <WordGame messages={messages} />;
  }

  const isOwner = game.owner == nickname;

  return (
    <div className="wordgame-main h-screen flex justify-center items-center text-white">
      <Head>
        <title>Word - Game</title>
      </Head>

      <WordBackground>
        <div className="main-content-box bg-light sm:px-8 pb-5 pt-3 rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] w-[900px] self-center h-[575px]">
          <div>
            <WordTop
              nickname={nickname}
              hideRounds={wasKicked}
              hideShare={wasKicked}
            />

            <div
              className={
                'content-box bg-dark relative rounded-2xl mb-5 mt-3 mx-5 h-full' +
                (game.state == State.INGAME || wasKicked
                  ? ''
                  : ' lg:px-8 md:px-8 py-6 scrollbar overflow-y-scroll')
              }
            >
              {content}
            </div>

            {isInLobby && !wasKicked && (
              <WordBottomLink
                onClick={() => localPlayer.startRound()}
                disabled={!isOwner}
                label={isOwner ? 'بدء الجولة' : 'في انتظار منشئ الغرفة'}
              />
            )}
          </div>
        </div>
      </WordBackground>
    </div>
  );
};

export default WordGamePage;
