import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FaCrown, FaMedal, FaTimes } from 'react-icons/fa';
import { kickPlayer } from '../../api/rooms';
import useNickname from '../../helpers/hooks/useNickname';
import { useAppSelector } from '../../state/hooks';

interface WordLeaderboardProps { }

const WordLeaderboard: React.FC<WordLeaderboardProps> = ({ }) => {
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
        <div className="relative player text-center sm:text-right w-[197]">
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
              <FaCrown className="absolute -top-1 -right-1 bg-white text-[#EBB10F] text-[1.5rem] border rounded-3xl p-[0.2rem]" />
            )}
          </div>
          <div className="whitespace-nowrap overflow-hidden" dir="rtl">
            <span
              className={classNames(
                `name text-lg inline-block ${nickname === pNick
                  ? 'drop-shadow-[0_4px_3px_rgba(0,0,0,0.1)] text-[#70FF75]'
                  : ''
                }`,
                { 'opacity-40': !isOnline }
              )}
            >
              {pNick}
            </span>
            <br />
            <p
              className={classNames('points-main text-[12px]', {
                'opacity-40': !isOnline,
              })}
              dir="rtl"
            >
              <span className="points">{score}</span> نقطة{' '}
            </p>
          </div>
        </div>
        <hr className="my-4 h-1 mx-6 opacity-20" />
      </div>
    );
  };

  return (
    <div className="players-list gird grid-cols rounded-r-2xl scrollbar-thin overflow-y-scroll text-right px-[11px] pt-[30px] pb-[20px] bg-[#38b880]">
      {sortedPlayers.map((p, num) => {
        let color = 'bg-[#fff]';
        if (num == 0) {
          color = 'bg-[#ebb10f]';
        }
        if (num == 1) {
          color = 'bg-[#E6EDF5]';
        } else if (num == 2) {
          color = 'bg-[#ca7d31]';
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
            'bg-white',
            '------',
            0,
            true,
            true
          )
        )}
    </div>
  );
};

export default WordLeaderboard;
