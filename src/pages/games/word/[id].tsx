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
import { joinRoom } from "../../../api/rooms";
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

  //FOR TESTING
  const nickname = "test";

  //join room
  if (typeof window !== "undefined") {
    useEffect(() => {
      if (id) {
        joinRoom(nickname, id as string).then(({ authToken, roomOptions }) => {
          if (!authToken) return; // TODO: show error
          dispatch(setToken(authToken));
          dispatch(setRoom({ id: id as string, options: roomOptions }));

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
        });
      }
    }, []);
  }

  return (
    <div className="wordgame-main h-screen flex justify-center items-center text-white">
      <Head>
        <title>Word - Game</title>
      </Head>

      <div className="bg-[url('../../public/wordbackground.svg')] bg-cover z-0 fixed top-0 left-0 w-full h-full"></div>

      <div className="main-content-box absolute bg-light sm:px-8 pb-5 pt-3 rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] max-w-4xl ">
        {loading ? (
          <p>Loading lol</p>
        ) : (
          <div>
            <div className="top-info relative">
              <div className="icons absolute bottom-2 left-12">
                <FaSignOutAlt className="inline text-4xl mr-3 text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer" />
                <FaCog className="inline text-4xl mr-3 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer" />
                <FaShareAlt className="inline text-4xl mr-3 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer" />
              </div>
              <Image src="/wordlogo.svg" width="85" height="85" alt="logo" />
              <h2 className="rounds absolute text-3xl right-8 bottom-0">
                الجولة <span className="current-round">0</span>/
                <span className="game-rounds">{room.options?.rounds}</span>
              </h2>
            </div>

            <div className="content-box bg-dark lg:px-8 md:px-8 py-6 rounded-2xl mb-5 mt-3 mx-5 scrollbar overflow-y-scroll max-h-96 flex">
              <div className="top-players-main mr-[320px]">
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

              <div className="players-list flex flex-col flex-wrap-reverse">
                {(players || []).map((p, num) => (
                  <div key={num} className="player text-right mb-4 ml-8">
                    <div className="number float-right ml-2 text-5xl bg-white text-[#d3d3d3] w-16 h-16 flex justify-center items-center rounded-full shadow-[0_4px_8px_0_rgba(0,0,0,0.4)]">
                      {num + 1}
                    </div>
                    <span className="name text-2xl mt-2 inline-block">
                      {p.nickname}
                    </span>
                    <br />
                    <p className="points-main text-[12px]" dir="rtl">
                      <span className="points">{p.lastRoundScore}</span> نقطة{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-white ml-10 text-xl cursor-pointer float-left hover:text-black font-semibold">
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
