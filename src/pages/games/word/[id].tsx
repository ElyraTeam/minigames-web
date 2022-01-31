import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { joinRoom } from "../../../api/rooms";
import localPlayer from "../../../api/socket";
import Spinner from "../../../components/shared/Spinner";
import WordLobby from "../../../components/words/WordLobby";
import WordBackground from "../../../components/words/shared/WordBackground";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  resetData,
  setCategoryInputValues,
  setToken,
} from "../../../state/reducers/local";
import room, { setRoom } from "../../../state/reducers/room";
import WordTimer from "../../../components/words/WordTimer";
import WordBottomLink from "../../../components/words/shared/WordBottomLink";
import WordTop from "../../../components/words/WordTop";
import { State } from "../../../models/game";
import { addChatMessage } from "../../../state/reducers/chat";
import WordWaiting from "../../../components/words/WordWaiting";
import WordChat from "../../../components/words/WordChat";
import WordGameBoard from "../../../components/words/WordGameBoard";
import useCountdown from "../../../helpers/hooks/useCountdown";
import WordVoting from "../../../components/words/WordVoting";
import { store } from "../../../state/store";
import useNickname from "../../../helpers/hooks/useNickname";
import Footer from "../../../components/shared/Footer";
import WordGameOver from "../../../components/words/WordGameOver";

const DUMMY_CATEGORY_DATA: CategoryVoteData = {
  category: "مدينة",
  votes: { كريم: 5 },
  values: { كريم: "احمد", جاست: "سوسن", حسام: "محمد" },
};

const WordGamePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const game = useAppSelector((state) => state.gameSlice);
  const players = useAppSelector((state) => state.playersSlice.players);
  const [isLoading, setLoading] = useState(true);
  const [isWaitingDone, setWaitingDone] = useState(true);
  const { countdown, setCountdown } = useCountdown(0);
  const [lobbyMessage, setLobbyMessage] = useState<string>("");
  //const [categoryValues, setCategoryValues] = useState<CategoryValues>({});
  const [categoryVoteData, setCategoryVoteData] = useState<CategoryVoteData>();
  const [votes, setVotes] = useState<Votes>({});
  const [votedCount, setVotedCount] = useState(0);
  const isTimerRunning = countdown != 0;
  const nickname = useNickname(`/games/word/${id}`);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    setVoted(players?.find((p) => p.nickname == nickname)?.voted ?? false);
  }, [players]);

  //join room
  if (typeof window !== "undefined") {
    useEffect(() => {
      if (id && typeof window !== "undefined") {
        dispatch(resetData());
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
              dispatch(setCategoryInputValues({})); //To reset ingame values
            });

            localPlayer.onRequestValues((callback) => {
              setWaitingDone(false);
              const values = store.getState().localSlice.categoryInputValues;
              callback(values);
            });

            localPlayer.onStartVote((categoryData) => {
              setVoted(false);
              setVotes({});
              setCategoryVoteData(categoryData);
            });

            localPlayer.onUpdateVotedCount((count) => {
              setVotedCount(count);
            });

            localPlayer.onPlayerVotes((allVotes) => {
              console.log(allVotes);
              if (allVotes[nickname]) {
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
                  if (res === "good") {
                    setLoading(false);
                  } else {
                    //TODO: show error
                  }
                }
              );
            };
            localPlayer.socket.on("connect", doAuth);
            localPlayer.socket.connect();
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
    setVoted(true);
    votes[nickname] = 999;
    localPlayer.sendVotes(votes);
  }

  let content = <Spinner />;
  const showLobbyMessage = lobbyMessage != "";
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
        <WordGameBoard />
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
        disableVotes={voted}
      />
    );
  } else if (game.state == State.GAME_OVER) {
    content = <WordGameOver />;
  } else if (isLoading) {
    content = <Spinner />;
  } else {
    content = <WordLobby />;
  }
  const isOwner = game.owner == nickname;

  let bottomLinkText = "..في انتظار منشئ الغرفة";
  let isBottomLinkDisabled = true;
  if (isOwner) {
    if ((players?.length || 0) < 2) {
      bottomLinkText = "..في انتظار المزيد من اللاعبين";
    } else {
      bottomLinkText = "بدء جولة";
      isBottomLinkDisabled = false;
    }
  }

  //TODO: change start label to indicate player count
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
                "content-box bg-dark relative rounded-2xl mb-5 mt-3 mx-5 h-[384px] lg:items-center lg:pb-0 " +
                (isInLobby || isTimerRunning ? "" : "lg:flex") +
                (game.state == State.INGAME || !showLobbyMessage
                  ? ""
                  : " scrollbar overflow-y-scroll") +
                (isTimerRunning ? "justify-center align-center flex" : "")
              }
            >
              {content}
            </div>

            {isInLobby && !showLobbyMessage && (
              <WordBottomLink
                onClick={() => localPlayer.startRound()}
                disabled={isBottomLinkDisabled}
                label={bottomLinkText}
              />
            )}

            {game.state == State.GAME_OVER && (
              <WordBottomLink
                onClick={() => localPlayer.resetGame()}
                label={"اعادة اللعبة"}
              />
            )}

            {(game.state == State.INGAME ||
              (game.state == State.VOTING && isWaitingDone)) &&
              !isTimerRunning && (
                <div className="flex justify-center align-middle">
                  {game.state == State.VOTING && voted && (
                    <p className="align-middle self-center text-2xl font-bold">
                      {players?.length ?? 0}/
                      <span className="text-secondary">{votedCount}</span>
                    </p>
                  )}
                  {(game.state == State.INGAME || !voted) && (
                    <button
                      className="finish-button bg-[#1a8b90] hover:bg-[#12595c] text-white py-2 px-5 rounded-3xl ml-4"
                      onClick={
                        game.state == State.INGAME ? finishRound : finishVote
                      }
                    >
                      !انتهيت
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>
      </WordBackground>
      <Footer />
    </div>
  );
};

export default WordGamePage;
