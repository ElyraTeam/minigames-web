import { useEffect, useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import { useAppSelector } from '../../state/hooks';

interface WordLeaderboardProps {}

const WordLeaderboard: React.FC<WordLeaderboardProps> = ({}) => {
  const players = useAppSelector((state) => state.playersSlice.players);
  const game = useAppSelector((state) => state.gameSlice);

  const getMostScorePlayers = () => {
    return [...sortedPlayers].sort((a, b) => a.totalScore - b.totalScore);
  };

  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setSortedPlayers(
      [...(players || [])].sort((a, b) => a.lastRoundScore - b.lastRoundScore)
    );
  }, [players]);

  const filter = (nickname: string, totalScore: number, order: number) => {
    let color = 'text-[#FFD700]';
    let margin = '';
    if (order == 1) {
      color = 'text-[#e7dede]';
      margin = 'my-14';
    } else if (order == 2) {
      color = 'text-[#CD7F32]';
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
          <span className="points">{totalScore}</span> نقطة{' '}
        </p>
        {order == 1 && (
          <hr className="m-5 w-[140px] text-black opacity-[.15]" />
        )}
      </div>
    );
  };

  return (
    <div className="top-players-main flex flex-col justify-center align-center">
      {game.currentRound == 1
        ? Array.from({ length: 3 }, (x, i) => i).map((num) =>
            filter('--------', 0, num)
          )
        : getMostScorePlayers()
            .slice(0, 3)
            .map((plr, order) => filter(plr.nickname, plr.totalScore, order))}
    </div>
  );
};

export default WordLeaderboard;
