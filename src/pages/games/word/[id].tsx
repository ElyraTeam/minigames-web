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
import { State } from '../../../models/game';
import { addChatMessage } from '../../../state/reducers/chat';
import WordWaiting from '../../../components/words/WordWaiting';
import WordChat from '../../../components/words/WordChat';
import WordGameBoard from '../../../components/words/WordGameBoard';
import useCountdown from '../../../helpers/hooks/useCountdown';
import WordVoting from '../../../components/words/WordVoting';

const DUMMY_CATEGORY_DATA: CategoryVoteData = {
  category: 'مدينة',
  votes: new Map<string, number>(Object.entries({ كريم: 5 })),
  values: new Map<string, string>(
    Object.entries({ كريم: 'احمد', جاست: 'سوسن', حسام: 'محمد' })
  ),
};

const WordGamePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const game = useAppSelector((state) => state.gameSlice);
  const [isLoading, setLoading] = useState(true);
  const [isWaitingDone, setWaitingDone] = useState(true);
  const { countdown, setCountdown } = useCountdown(0);
  const [lobbyMessage, setLobbyMessage] = useState<string>('');
  const [categoriesValues, setCategoriesValues] = useState<CategoriesValues>(
    {}
  );
  const [categoryVoteData, setCategoryVoteData] =
    useState<CategoryVoteData>(DUMMY_CATEGORY_DATA);
  const [votes, setVotes] = useState<Map<string, number>>(
    new Map<string, number>(Object.entries({}))
  );
  const isTimerRunning = countdown != 0;
  const nickname = useAppSelector((state) => state.localSlice.nickname)!;

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

            localPlayer.offAll();

            localPlayer.onChat((msg) => {
              dispatch(addChatMessage(msg));
            });

            localPlayer.onKick((kickMsg) => {
              dispatch(resetData());
              setLobbyMessage(kickMsg);
            });

            localPlayer.onStartTimer((countdown) => {
              setCountdown(countdown);
            });

            localPlayer.onRequestValues((callback) => {
              setWaitingDone(false);
              callback(categoriesValues);
            });

            localPlayer.onStartVote((categoryData) => {
              console.log(categoryData);
              setCategoryVoteData(DUMMY_CATEGORY_DATA);
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

  function finishRound() {
    localPlayer.finishRound();
  }

  function finishVote() {
    localPlayer.sendVotes(votes);
  }

  let content = <Spinner />;
  const showLobbyMessage = lobbyMessage != '';
  const isInLobby = !isTimerRunning && !isLoading && game.state == State.LOBBY;

  if (showLobbyMessage) {
    content = (
      <p className="text-xl font-bold text-center p-12 h-full flex items-center justify-center w-full">
        {lobbyMessage}
      </p>
    );
  } else if (isTimerRunning) {
    content = <WordTimer countdown={countdown} />;
  } else if (game.state == State.INGAME) {
    content = (
      <div className="game-board-main h-[384px] flex relative">
        <WordChat />
        <WordGameBoard
          categoriesValues={categoriesValues}
          onCategoryValueChange={(category, value) => {
            console.log(category, value, categoriesValues);
            setCategoriesValues((oldVal) => ({ ...oldVal, [category]: value }));
          }}
        />
      </div>
    );
  } else if (game.state == State.WAITING || !isWaitingDone) {
    content = (
      <WordWaiting
        stopperNickname={game.stopClicker!}
        isWaitingDone={isWaitingDone}
        onWaitingStart={() => setWaitingDone(false)}
        onWaitingDone={() => setWaitingDone(true)}
      />
    );
  } else if (game.state == State.VOTING && isWaitingDone) {
    content = (
      <WordVoting
        votes={votes}
        onVoteChange={(nickname, vote) =>
          setVotes((oldVal) => ({ ...oldVal, [nickname]: vote }))
        }
        categoryVoteData={categoryVoteData!}
      />
    );
  } else if (isLoading) {
    content = <Spinner />;
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
              hideRounds={isLoading || showLobbyMessage}
              hideShare={showLobbyMessage}
            />

            <div
              className={
                'content-box bg-dark relative rounded-2xl mb-5 mt-3 mx-5 h-[384px] lg:items-center lg:pb-0 ' +
                (isInLobby || isTimerRunning ? '' : 'lg:flex') +
                (game.state == State.INGAME || !showLobbyMessage
                  ? ''
                  : ' scrollbar overflow-y-scroll') +
                (isTimerRunning ? 'justify-center align-center flex' : '')
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

            {(game.state == State.INGAME || game.state == State.VOTING) &&
              !isTimerRunning && (
                <div className="flex justify-center align-middle">
                  {game.state == State.VOTING && (
                    <p className="align-middle self-center text-2xl font-bold">
                      8/<span className="text-secondary">4</span>
                    </p>
                  )}
                  <button
                    className="finish-button bg-[#1a8b90] hover:bg-[#12595c] text-white py-2 px-5 rounded-3xl ml-4"
                    onClick={
                      game.state == State.INGAME ? finishRound : finishVote
                    }
                  >
                    !انتهيت
                  </button>
                </div>
              )}
          </div>
        </div>
      </WordBackground>
    </div>
  );
};

export default WordGamePage;
