import { FaMedal, FaTimes } from 'react-icons/fa';
import { kickPlayer } from '../../api/rooms';
import { useAppSelector } from '../../state/hooks';

interface LobbyProps {
  nickname: string;
}

const Lobby: React.FC<LobbyProps> = ({ nickname }) => {
  const game = useAppSelector((state) => state.gameSlice);
  const players = useAppSelector((state) => state.playersSlice.players);

  const getMostScorePlayers = () => {
    return [...(players || [])].sort((a, b) => a.totalScore - b.totalScore);
  };

  const filter = (nickname: string, totalScore: number, order: number) => {
    let color = '#FFD700';
    if (order == 1) {
      color = '#C0C0C0';
    } else if (order == 2) {
      color = '#CD7F32';
    }
    return (
      <div
        className={`rank rank-3 text-right ${order > 0 ? 'mt-10' : ''}`}
        key={order}
      >
        <FaMedal className={`float-right text-5xl ml-5 text-[${color}]`} />
        <span className="name text-xl">{nickname}</span>
        <br />
        <p className="points-main text-[12px]" dir="rtl">
          <span className="points">{totalScore}</span> نقطة{' '}
        </p>
      </div>
    );
  };

  // #FFD700 - #C0C0C0 - #CD7F32

  return (
    <div className="game-stats">
      <div className="top-players-main mr-[10px] float-left">
        <h3 className="mb-5">أعلى النقاط</h3>
        <div className="top-players bg-[#58de85] py-8 px-12 rounded-3xl overflow-hidden">
          {game.currentRound == 1
            ? Array.from({ length: 3 }, (x, i) => i).map((num) =>
                filter('--------', 0, num)
              )
            : getMostScorePlayers()
                .slice(0, 3)
                .map((plr, order) =>
                  filter(plr.nickname, plr.totalScore, order)
                )}
        </div>
      </div>

      <div className="players-list flex flex-col flex-wrap">
        {(players || []).map((p, num) => (
          <div
            key={num}
            className="relative player text-right ml-8 flex[1 1 80px]"
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
                <span className="points">{p.lastRoundScore}</span> نقطة{' '}
              </p>
            </div>
            {game.owner == nickname && nickname != p.nickname && (
              <FaTimes
                className="absolute -top-1 -right-1 bg-[#f00] text-white text-[1.6rem] rounded-3xl p-1 cursor-pointer"
                onClick={() => kickPlayer(game.owner!, game.id!, p.nickname)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
