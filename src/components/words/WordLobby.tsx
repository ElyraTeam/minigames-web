import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaMedal, FaTimes, FaCrown } from "react-icons/fa";
import { kickPlayer } from "../../api/rooms";
import useNickname from "../../helpers/hooks/useNickname";
import { useAppSelector } from "../../state/hooks";
import WordChat from "./WordChat";

interface LobbyProps {}

const Lobby: React.FC<LobbyProps> = () => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const players = useAppSelector((state) => state.playersSlice.players);

  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const nickname = useNickname();

  useEffect(() => {
    setSortedPlayers(
      [...(players || [])].sort((a, b) => b.lastRoundScore - a.lastRoundScore)
    );
  }, [players]);

  const getTop3Players = () => {
    return [...sortedPlayers]
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3);
  };

  const playerCircle = (
    num: number,
    color: string,
    pNick: string,
    score: number,
    dummy: boolean,
    isOnline: boolean
  ) => {
    return (
      <div key={num}>
        <div className="relative player text-center sm:text-right xs:mt-8 sm:mb-4 sm:w-[100%]">
          <div
            className={`number relative sm:float-right mx-auto sm:ml-2 text-3xl ${color} text-[#d3d3d3] w-12 h-12 flex justify-center items-center rounded-full shadow-[0_4px_8px_0_rgba(0,0,0,0.4)]`}
          >
            {num + 1}
            {!dummy && game.owner === nickname && nickname !== pNick && (
              <FaTimes
                className="absolute -top-1 -right-1 bg-[#f00] text-white text-[1.4rem] rounded-3xl p-1 cursor-pointer"
                onClick={() => kickPlayer(game.owner!, game.id!, pNick)}
              />
            )}
            {game.owner === pNick && (
              <FaCrown className="absolute -top-1 -right-1 bg-white text-[#EBB10F] text-[1.4rem] border rounded-3xl p-1" />
            )}
          </div>
          <div className="whitespace-nowrap overflow-hidden">
            <span
              className={classNames(
                `name text-xl inline-block ${
                  nickname === pNick
                    ? "drop-shadow-[0_4px_3px_rgba(0,0,0,0.1)] text-[#70FF75]"
                    : ""
                }`,
                { "opacity-40": !isOnline }
              )}
            >
              {pNick.length > 8 ? pNick.slice(0, 8) + ".." : pNick}
            </span>
            <br />
            <p
              className={classNames("points-main text-[12px]", {
                "opacity-40": !isOnline,
              })}
              dir="rtl"
            >
              <span className="points">{score}</span> نقطة{" "}
            </p>
          </div>
        </div>
        <hr className="my-4 h-1 mx-6 opacity-20" />
      </div>
    );
  };

  // #FFD700 - #C0C0C0 - #CD7F32

  const topPlayers = getTop3Players();
  const firstP = topPlayers[0];
  const secondP = topPlayers[1];
  const thirdP = topPlayers[2];

  return (
    <div className="game-stats grid grid-cols-8 h-full sm:overflow-hidden">
      {/* <WordSidebar /> */}

      <div className="chat-section col-span-2">
        <WordChat />
      </div>

      <div className="stats col-span-4 sm:text-center py-8">
        <h3 className="text-2xl">المتصدرون</h3>

        <div className="leaderboard bg-[#58de85] grid grid-cols-3 my-5 py-5 px-[20px] mx-5 rounded-3xl">
          <div className="1st text-center order-2">
            <FaMedal className="mx-auto text-6xl text-[#ffd700] drop-shadow-lg mb-2" />
            <p className="1st-name">
              {!firstP || firstP.totalScore == 0 ? "------" : firstP.nickname}
            </p>
            <p className="1st-points">
              <span className="1st-points">
                {firstP ? firstP.totalScore : 0}
              </span>{" "}
              نقطة
            </p>
          </div>
          <div className="2st text-center order-1">
            <FaMedal className="mx-auto text-5xl text-[#d5f7ef] drop-shadow-lg mb-2" />
            <p className="2nd-name">
              {!secondP || secondP.totalScore == 0
                ? "------"
                : secondP.nickname}
            </p>
            <p className="2nd-points">
              <span className="2nd-points">
                {secondP ? secondP.totalScore : 0}
              </span>{" "}
              نقطة
            </p>
          </div>
          <div className="3rd text-center order-3">
            <FaMedal className="mx-auto text-5xl text-[#b28812] drop-shadow-lg mb-2" />
            <p className="3rd-name">
              {!thirdP || thirdP.totalScore == 0 ? "------" : thirdP.nickname}
            </p>
            <p className="3rd-points">
              <span className="3rd-points">
                {thirdP ? thirdP.totalScore : 0}
              </span>{" "}
              نقطة
            </p>
          </div>
        </div>

        <p className="text-xl font-bold mb-2 mt-10" dir="rtl">
          مجموع نقاطك:
        </p>
        <p dir="rtl">
          <span className="your-points text-[#1a8b90] font-bold">
            {players?.find((p) => p.nickname == nickname)?.totalScore ?? 0}
          </span>{" "}
          نقطة
        </p>
      </div>

      <div className="players-list gird grid-cols col-span-2 rounded-r-2xl scrollbar-thin overflow-y-scroll text-right px-[11px] pt-[30px] pb-[20px] bg-[#38b880]">
        {sortedPlayers.map((p, num) => {
          let color = "bg-[#fff]";
          if (num == 0) {
            color = "bg-[#ebb10f]";
          }
          if (num == 1) {
            color = "bg-[#E6EDF5]";
          } else if (num == 2) {
            color = "bg-[#ca7d31]";
          }
          return playerCircle(
            num,
            color,
            p.nickname,
            p.lastRoundScore,
            false,
            p.online
          );
        })}
        {room.options &&
          Array.from(
            { length: room.options.maxPlayers - sortedPlayers.length },
            (x, i) => i + 1
          ).map((num) =>
            playerCircle(
              num + sortedPlayers.length - 1,
              "bg-white",
              "------",
              0,
              true,
              true
            )
          )}
      </div>
    </div>
  );
};

export default Lobby;
