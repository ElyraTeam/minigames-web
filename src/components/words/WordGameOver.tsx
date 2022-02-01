import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import useNickname from '../../helpers/hooks/useNickname';
import { useAppSelector } from '../../state/hooks';

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
        className={`rank rank-3 xs:text-center sm:text-right overflow-hidden xs:mx-5 my-2 flex flex-col items-center mx-5`}
        key={order}
      >
        <FaMedal
          className={classNames(
            `sm:float-right text-7xl xs:mx-auto mb-2 drop-shadow-md`,
            { 'text-[6rem]': order == 0 },
            color
          )}
        />
        <span
          className={classNames(
            'mb-2 name font-bold drop-shadow-md ',
            {
              'text-xl': order != 0,
              'text-2xl': order == 0,
            },
            color
          )}
        >
          {nickname}
        </span>
        <p className="points-main text-[15px]" dir="rtl">
          <span className="points">{totalScore}</span> نقطة{' '}
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
        المركز {sortedPlayers.findIndex((p) => p.nickname == nickname) + 1} -{' '}
        {players?.find((p) => p.nickname == nickname)?.totalScore} نقطة
      </p>
      <div className="bg-light rounded-2xl mx-20  mb-7 mt-7 flex-grow flex flex-row  w-[500px] justify-around align-center items-center">
        {sortedPlayers
          .slice(2, 3)
          .map((plr, order) => filter(plr.nickname, plr.totalScore, 2))}
        {sortedPlayers
          .slice(1, 2)
          .map((plr, order) => filter(plr.nickname, plr.totalScore, 1))}
        {sortedPlayers
          .slice(0, 1)
          .map((plr, order) => filter(plr.nickname, plr.totalScore, 0))}

        {Array.from(
          { length: sortedPlayers.length < 3 ? 3 - sortedPlayers.length : 0 },
          (x, i) => i + 1
        ).map((num) => filter('------', 0, 3 - num))}
      </div>
    </div>
  );
};

export default WordGameOver;
