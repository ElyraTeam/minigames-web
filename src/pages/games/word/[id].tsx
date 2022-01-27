import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaMedal,
  FaSignOutAlt,
  FaCog,
  FaShareAlt,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { joinRoom, leaveRoom } from "../../../api/rooms";
import localPlayer from "../../../api/socket";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { setToken } from "../../../state/reducers/local";
import { setRoom } from "../../../state/reducers/room";

const WordGame: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const players = useAppSelector((state) => state.playersSlice.players);
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const nickname =
    localStorage.getItem("nickname") ||
    "User" + (Math.floor(Math.random() * 100) + 1);
  localStorage.setItem("nickname", nickname);

  async function pageLeaveRoom() {
    await leaveRoom(nickname, id as string);
    dispatch(setToken(""));
    dispatch(setRoom({}));

    router.replace(`/games/word/create`);
  }

  //join room
  if (typeof window !== "undefined") {
    useEffect(() => {
      if (id) {
        joinRoom(nickname, id as string).then(({ authToken, roomOptions }) => {
          if (!authToken) return; // TODO: show error
          dispatch(setToken(authToken));
          dispatch(setRoom({ id: id as string, options: roomOptions }));

          //register socket events HERE

          localPlayer.socket.connect();

          const doAuth = () => {
            localPlayer.authenticate(
              {
                authToken,
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

          if (localPlayer.socket.connected) {
            doAuth();
          } else {
            localPlayer.socket.on("connect", doAuth);
          }
        });
      }
    }, [id]);
  }

  function startRound() {
    //TODO: NO DOM PLS -hos
    (document.querySelector(".game-stats") as any)!.style.display = "none";
    (document.querySelector(".timer") as any)!.style.display = "flex";
    (document.querySelector(".bottom-link") as any)!.style.display = "none";

    let i = 2;
    let timer = setInterval(() => {
      if (i === 0) {
        clearInterval(timer);
        (document.querySelector(".content-box") as any)!.style.padding = "0";
        (document.querySelector(".content-box") as any)!.style.overflow =
          "hidden";
        (document.querySelector(".timer") as any)!.style.display = "none";
        (document.querySelector(".game-board-main") as any)!.style.display =
          "flex";
        return;
      }

      (document.querySelector(".timer") as any)!.textContent = i;
      i--;
    }, 1000);

    localPlayer.startRound();
  }

  function sendMessage(event: any, msg: string, keypressed: boolean) {
    if (msg === "" || msg === " ") return;
    if (keypressed) {
      if (event.charCode !== 13) {
        return;
      }
    }

    localPlayer.chat(msg);

    (document.querySelector(".messages") as any)!.innerHTML += `
    <div className="message-cont" style="text-align:right;margin:0 .75rem .25rem">
      <p className="sender" style="color: #5ee494">ملوخية</p>
      <p className="message" style="overflow-wrap: break-word">${msg}</p>
    </div>`;

    setMessage("");
  }

  function finishRound() {
    localPlayer.finishRound();
  }

  return (
    <div className="wordgame-main h-screen flex justify-center items-center text-white">
      <Head>
        <title>Word - Game</title>
      </Head>

      <div className="bg-[url('../../public/wordbackground.svg')] bg-cover z-0 fixed top-0 left-0 w-full h-full"></div>

      <div className="main-content-box min-w-[900px] absolute bg-light sm:px-8 pb-5 pt-3 rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] max-w-4xl ">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div>
            <div className="top-info relative">
              <div className="icons absolute bottom-2 left-12">
                <FaSignOutAlt
                  onClick={pageLeaveRoom}
                  className="inline text-4xl mr-3 text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer"
                />
                {game.state == 0 ? (
                  <FaCog className="inline text-4xl mr-3 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer" />
                ) : null}
                <FaShareAlt className="inline text-4xl mr-3 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer" />
              </div>
              <Image src="/wordlogo.svg" width="85" height="85" alt="logo" />
              <h2 className="rounds absolute text-3xl right-8 bottom-0">
                الجولة{" "}
                <span className="game-rounds">{room.options?.rounds}</span>
                <span className="current-round text-[#1a8c90]">
                  /{game.currentRound}
                </span>
              </h2>
            </div>

            <div className="content-box bg-dark relative lg:px-8 md:px-8 py-6 rounded-2xl mb-5 mt-3 mx-5 scrollbar overflow-y-scroll max-h-96">
              <div className="game-stats">
                <div className="top-players-main mr-[10px] float-left">
                  <h3 className="mb-5">أعلى النقاط</h3>
                  <div className="top-players bg-[#58de85] py-8 px-12 rounded-3xl overflow-hidden">
                    <div className="rank rank-1 text-right">
                      <FaMedal className="float-right text-5xl ml-5 text-[#FFD700]" />
                      <span className="name text-xl">جاست</span>
                      <br />
                      <p className="points-main text-[12px]" dir="rtl">
                        <span className="points">0</span> نقطة{" "}
                      </p>
                    </div>
                    <div className="rank rank-2 my-10 text-right">
                      <FaMedal className="float-right text-5xl ml-5 text-[##C0C0C0]" />
                      <span className="name text-xl">إيهاد</span>
                      <br />
                      <p className="points-main text-[12px]" dir="rtl">
                        <span className="points">0</span> نقطة{" "}
                      </p>
                    </div>
                    <div className="rank rank-3 text-right">
                      <FaMedal className="float-right text-5xl ml-5 text-[#CD7F32]" />
                      <span className="name text-xl">سوسن</span>
                      <br />
                      <p className="points-main text-[12px]" dir="rtl">
                        <span className="points">0</span> نقطة{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="players-list flex flex-row-reverse flex-wrap">
                  {(players || []).map((p, num) => (
                    <div
                      key={num}
                      className="player text-right mb-4 ml-8 flex[1 1 80px]"
                    >
                      <div className="number float-right ml-2 text-5xl bg-white text-[#d3d3d3] w-16 h-16 flex justify-center items-center rounded-full shadow-[0_4px_8px_0_rgba(0,0,0,0.4)]">
                        {num + 1}
                      </div>
                      <div className="">
                        <span className="name text-2xl mt-2 inline-block">
                          {p.nickname}
                        </span>
                        <br />
                        <p className="points-main text-[12px]" dir="rtl">
                          <span className="points">{p.lastRoundScore}</span>{" "}
                          نقطة{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="timer hidden text-8xl rounded-full w-40 h-40 relative left-[50%] translate-x-[-50%] justify-center items-center bg-light">
                3
              </h3>

              <div className="game-board-main hidden h-80 flex relative">
                <div className="chat-main bg-[#38b77f] h-full w-[22%]">
                  <div className="messages h-[80%] flex flex-col justify-end"></div>
                  <div className="type-message relative bg-[#2ca686] h-[20%] flex justify-center items-center">
                    <MdSend
                      className="scale-[-1] mr-1 text-[#005c44] cursor-pointer"
                      onClick={(e) => sendMessage(e, message, false)}
                    />
                    <input
                      type="text"
                      placeholder="اكتب رسالة"
                      value={message}
                      onKeyPress={(e) => sendMessage(e, message, true)}
                      onChange={(input) => setMessage(input.target.value)}
                      className="bg-transparent placeholder:text-white focus:outline-0 w-32 pb-2 border-b"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="game-board pt-10 w-[78%] overflow-y-scroll scrollbar">
                  <h2 className="text-2xl text-right pr-10">
                    اكتب كلمات تبدأ بحرف:&nbsp;{" "}
                    <span className="char text-3xl">{game.currentLetter}</span>
                  </h2>

                  <div className="inputs flex flex-wrap" dir="rtl">
                    {room.options?.categories.map((category) => (
                      <div key={category} className="input m-4 mb-2">
                        <p className="text-xl mb-3">{category}</p>
                        <input
                          type="text"
                          placeholder={category}
                          className="py-3 px-5 text-black rounded-3xl w-40 border border-[#447e83] focus:border-2 focus:outline-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h3
              className="bottom-link text-white ml-10 text-xl cursor-pointer float-left hover:text-[#1A8B90] font-semibold"
              onClick={startRound}
            >
              <FaArrowLeft className="inline mr-2" />
              بدء الجولة
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;
