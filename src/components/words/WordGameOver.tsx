import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import useSound from 'use-sound';
import localPlayer from '../../api/socket';
import useAudio from '../../helpers/hooks/useAudio';
import useNickname from '../../helpers/hooks/useNickname';
import { useAppSelector } from '../../state/hooks';
import WordBottomLink from './shared/WordBottomLink';
import WordContent from './shared/WordContent';

interface TopPlayer {
  nickname: string;
  totalScore: number;
}

interface WordGameOverProps {}

const WordGameOver: React.FC<WordGameOverProps> = ({}) => {
  const players = useAppSelector((state) => state.playersSlice.players);
  const game = useAppSelector((state) => state.gameSlice);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const nickname = useNickname();
  const isOwner = game.owner == nickname;
  const { toggle: playGameover } = useAudio('/assets/sounds/victory.mp3');

  useEffect(() => {
    playGameover();
  }, []);

  useEffect(() => {
    setSortedPlayers(
      [...(players || [])].sort((a, b) => b.totalScore - a.totalScore)
    );
  }, [players]);

  const filter = (nickname: string, totalScore: number, order: number) => {
    let color = 'text-[#e7dede]';
    let margin = '';
    if (order == 1) {
      color = 'text-[#FFD700]';
      margin = 'my-14';
    } else if (order == 2) {
      color = 'text-[#CD7F32]';
    }
    return (
      <div
        className={`rank rank-3 xs:text-center sm:text-right overflow-hidden xs:mx-5 my-2 flex flex-col items-center mx-5 w-1/3 `}
        key={order}
      >
        <FaMedal
          className={classNames(
            `sm:float-right text-7xl xs:mx-auto mb-2 drop-shadow-md`,
            { 'text-[6rem]': order == 1 },
            color
          )}
        />
        <span
          className={classNames(
            'mb-2 name font-bold drop-shadow-md text-xl ',
            {
              'text-xl': order != 1,
              'text-2xl': order == 1,
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

  const generateEmptyPlayer = (): TopPlayer => {
    return { nickname: '----------', totalScore: 0 };
  };

  const getSortedPlayers = (): TopPlayer[] => {
    return [
      sortedPlayers[1] ?? generateEmptyPlayer(),
      sortedPlayers[0] ?? generateEmptyPlayer(),
      sortedPlayers[2] ?? generateEmptyPlayer(),
    ];
  };

  const leaderboard: TopPlayer[] = getSortedPlayers();

  return (
    <div>
      <WordContent>
        <div
          dir="rtl"
          className="flex flex-col text-center w-full h-full justify-start items-center"
        >
          <p className="mt-5 font-bold text-4xl">انتهت اللعبة</p>
          <p className="my-3 text-lg">
            المركز {sortedPlayers.findIndex((p) => p.nickname == nickname) + 1}{' '}
            - {players?.find((p) => p.nickname == nickname)?.totalScore} نقطة
          </p>
          <div
            className="bg-[#58DE85] rounded-2xl mx-20  mb-7 mt-7 flex-grow flex flex-row  w-[500px] justify-around align-center items-center"
            dir="ltr"
          >
            {leaderboard.map((plr, i) =>
              filter(plr.nickname, plr.totalScore, i)
            )}
          </div>
        </div>
      </WordContent>
      {isOwner && (
        <WordBottomLink
          onClick={() => localPlayer.resetGame()}
          label={'اعادة اللعبة'}
        />
      )}
    </div>
  );
};

export default WordGameOver;
