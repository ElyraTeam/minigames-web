import { useEffect, useState } from "react";
import { FaMedal, FaTimes, FaCrown } from "react-icons/fa";
import { kickPlayer } from "../../api/rooms";
import { useAppSelector } from "../../state/hooks";

interface LobbyProps {
  nickname: string;
}

const Lobby: React.FC<LobbyProps> = ({ nickname }) => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const players = useAppSelector((state) => state.playersSlice.players);

  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setSortedPlayers(
      [...(players || [])].sort((a, b) => a.lastRoundScore - b.lastRoundScore)
    );
  }, [players]);

  const getMostScorePlayers = () => {
    return [...sortedPlayers].sort((a, b) => a.totalScore - b.totalScore);
  };

  const filter = (nickname: string, totalScore: number, order: number) => {
    let color = "text-[#FFD700]";
    let margin = "";
    if (order == 1) {
      color = "text-[#e7dede]";
      margin = "my-14";
    } else if (order == 2) {
      color = "text-[#CD7F32]";
    }
    return (
      <div
        className={`rank rank-3 xs:text-center sm:text-right overflow-hidden xs:mx-5 my-2`}
        key={order}
      >
        {order == 1 && (
          <hr className="m-5 w-[140px] text-black opacity-[.15]" />
        )}
        <FaMedal
          className={`sm:float-right text-5xl xs:mx-auto sm:ml-5 drop-shadow-md ${color}`}
        />
        <span className="name text-xl">{nickname}</span>
        <br />
        <p className="points-main text-[12px]" dir="rtl">
          <span className="points">{totalScore}</span> نقطة{" "}
        </p>
        {order == 1 && (
          <hr className="m-5 w-[140px] text-black opacity-[.15]" />
        )}
      </div>
    );
  };

  const playerCircle = (
    num: number,
    color: string,
    pNick: string,
    score: number,
    dummy: boolean
  ) => {
    return (
      <div
        key={num}
        className="relative player text-center sm:text-right xs:mt-8 sm:mb-8 sm:w-[100%] md:w-[50%] lg:w-[33.33333%]"
      >
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
            className={`name text-xl inline-block ${
              nickname === pNick
                ? "drop-shadow-[0_4px_3px_rgba(0,0,0,0.1)] text-[#70FF75]"
                : ""
            }`}
          >
            {pNick.length > 6 ? pNick.slice(0, 6) + ".." : pNick}
          </span>
          <br />
          <p className="points-main text-[12px]" dir="rtl">
            <span className="points">{score}</span> نقطة{" "}
          </p>
        </div>
      </div>
    );
  };

  // #FFD700 - #C0C0C0 - #CD7F32

  return (
    <div className="game-stats flex justify-between items-center h-full">
      <div className="top-players-main xs:ml-1 sm:mr-[10px] sm:ml-5 md:ml-0 sm:float-left">
        <div className="top-players bg-[#58de85] xs:py-4 sm:py-4 sm:px-4 rounded-3xl overflow-hidden xs:flex xs:flex-wrap xs:justify-center">
          {game.currentRound == 1
            ? Array.from({ length: 3 }, (x, i) => i).map((num) =>
                filter("--------", 0, num)
              )
            : getMostScorePlayers()
                .slice(0, 3)
                .map((plr, order) =>
                  filter(plr.nickname, plr.totalScore, order)
                )}
        </div>
      </div>
      <div className="players-list xs:justify-center sm:flex flex-row-reverse flex-wrap">
        {sortedPlayers.map((p, num) => {
          let color = "bg-[#ebb10f]";
          if (num == 1) {
            color = "bg-[#ccfff3]";
          } else if (num == 2) {
            color = "bg-[#ca7d31]";
          }
          return playerCircle(num, color, p.nickname, p.lastRoundScore, false);
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
              true
            )
          )}
      </div>
    </div>
  );
};

export default Lobby;
