import { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";
import useNickname from "../../helpers/hooks/useNickname";
import { useAppSelector } from "../../state/hooks";

interface WordGameOverProps {}

const WordGameOver: React.FC<WordGameOverProps> = ({}) => {
  const players = useAppSelector((state) => state.playersSlice.players);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const nickname = useNickname();

  useEffect(() => {
    setSortedPlayers(
      [...(players || [])].sort((a, b) => b.totalScore - a.totalScore)
    );
  }, [players]);

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
        className={`rank rank-3 xs:text-center sm:text-right overflow-hidden xs:mx-5 my-2 flex flex-col items-center flex-sp mx-5`}
        key={order}
      >
        <FaMedal
          className={`sm:float-right text-5xl xs:mx-auto mb-2 drop-shadow-md ${color}`}
        />
        <span className={"name text-2xl " + color}>{nickname}</span>
        <br />
        <p className="points-main text-[15px]" dir="rtl">
          <span className="points">{totalScore}</span> نقطة{" "}
        </p>
      </div>
    );
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col text-center w-full h-full justify-start items-center"
    >
      <p className="mt-5 font-bold text-3xl">انتهت اللعبة</p>
      <p className="my-3 text-xl">
        المركز {sortedPlayers.findIndex((p) => p.nickname == nickname) + 1} -{" "}
        {players?.find((p) => p.nickname == nickname)?.totalScore} نقطة
      </p>
      <div className="bg-light rounded-2xl mx-20 my-20 flex flex-row h-[400px] w-[400px] justify-center align-center">
        {sortedPlayers
          .slice(0, 3)
          .map((plr, order) => filter(plr.nickname, plr.totalScore, order))}
      </div>
    </div>
  );
};

export default WordGameOver;
