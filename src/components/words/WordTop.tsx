import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { FaSignOutAlt, FaCog, FaShareAlt } from 'react-icons/fa';
import { leaveRoom } from '../../api/rooms';
import { HOST_TEMP } from '../../config/constants';
import { State } from '../../models/game';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { resetData } from '../../state/reducers/local';

interface WordTopProps {
  nickname: string;
  hideRounds?: boolean;
  hideShare?: boolean;
}

const WordTop: React.FC<WordTopProps> = ({
  nickname,
  hideRounds,
  hideShare,
}) => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const roomId = game.id!;

  async function pageLeaveRoom() {
    if (game.id) {
      await leaveRoom(nickname, roomId);
    }
    dispatch(resetData());

    router.replace(`/games/word/create`);
  }

  return (
    <div className="top-info relative">
      <div className="icons absolute bottom-2 left-12">
        <FaSignOutAlt
          onClick={pageLeaveRoom}
          className="inline text-4xl mr-3 text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer"
        />
        {game.owner == nickname && game.state == State.LOBBY ? (
          <FaCog className="inline text-4xl mr-3 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer" />
        ) : null}
        {!hideShare && (
          <FaShareAlt
            className="inline text-4xl mr-3 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer"
            onClick={() =>
              navigator.clipboard.writeText(`${HOST_TEMP}/games/word/${roomId}`)
            }
          />
        )}
      </div>
      <Image src="/wordlogo.svg" width="85" height="85" alt="logo" />
      {!hideRounds && (
        <h2 className="rounds absolute text-3xl right-8 bottom-0">
          الجولة <span className="game-rounds">{room.options?.rounds}</span>
          <span className="current-round text-[#1a8c90]">
            /{game.currentRound}
          </span>
        </h2>
      )}
    </div>
  );
};

export default WordTop;
