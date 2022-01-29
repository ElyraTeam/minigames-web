import { useEffect, useState } from 'react';
import { FaMedal, FaTimes, FaCrown } from 'react-icons/fa';
import { kickPlayer } from '../../api/rooms';
import { useAppSelector } from '../../state/hooks';
import WordSidebar from './WordSidebar';

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
                ? 'drop-shadow-[0_4px_3px_rgba(0,0,0,0.1)] text-[#70FF75]'
                : ''
            }`}
          >
            {pNick.length > 6 ? pNick.slice(0, 6) + '..' : pNick}
          </span>
          <br />
          <p className="points-main text-[12px]" dir="rtl">
            <span className="points">{score}</span> نقطة{' '}
          </p>
        </div>
      </div>
    );
  };

  // #FFD700 - #C0C0C0 - #CD7F32

  return (
    <div className="game-stats flex justify-between items-center h-full">
      <WordSidebar />
      <div className="players-list xs:justify-center sm:flex flex-row-reverse flex-wrap">
        {sortedPlayers.map((p, num) => {
          let color = 'bg-[#ebb10f]';
          if (num == 1) {
            color = 'bg-[#ccfff3]';
          } else if (num == 2) {
            color = 'bg-[#ca7d31]';
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
              'bg-white',
              '------',
              0,
              true
            )
          )}
      </div>
    </div>
  );
};

export default Lobby;
