import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FaSignOutAlt,
  FaCog,
  FaShareAlt,
  FaExclamationTriangle,
  FaCheck,
} from 'react-icons/fa';
import { leaveRoom } from '../../api/rooms';
import { HOST_TEMP } from '../../config/constants';
import { State } from '../../models/game';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { resetData } from '../../state/reducers/local';
import WordLogo from './shared/WordLogo';

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
  const [showLeaveBox, setShowLeaveBox] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const roomId = game.id!;

  async function pageLeaveRoom() {
    if (game.id) {
      await leaveRoom(nickname, roomId);
    }
    router.replace(`/games/word`);
    dispatch(resetData());
  }

  return (
    <div className="top-info relative">
      <WordLogo />

      <div className="icons xs:my-4 sm:absolute bottom-3 left-12">
        <FaSignOutAlt
          onClick={() => setShowLeaveBox(true)}
          className="inline text-[38px] mr-6 text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#f00] hover:text-white"
        />
        {game.owner == nickname && game.state == State.LOBBY ? (
          <FaCog className="inline text-[38px] mr-6 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white" />
        ) : null}
        {!hideShare && (
          <>
            {!showCheckIcon && (
              <FaShareAlt
                className="inline text-[38px] mr-6 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${HOST_TEMP}/games/word/${roomId}`
                  );
                  setShowCheckIcon(true);
                  setTimeout(() => {
                    setShowCheckIcon(false);
                  }, 1000);
                }}
              />
            )}

            {showCheckIcon && (
              <FaCheck className="inline text-[38px] mr-6 text-white bg-[#4ae24f] rounded-full p-2" />
            )}
          </>
        )}
      </div>

      {!hideRounds && (
        <h2 className="rounds sm:absolute text-3xl right-8 bottom-3 font-bold">
          الجولة&nbsp;&nbsp;{' '}
          <span className="game-rounds">{room.options?.rounds}</span>/
          <span className="current-round text-secondary">
            {game.currentRound}
          </span>
        </h2>
      )}

      {showLeaveBox && (
        <div className="leave-box absolute w-[400px] shadow-2xl rounded-2xl text-center text-black p-5 top-1/2 left-1/2 -translate-x-1/2 bg-white z-50">
          <FaExclamationTriangle className="text-[#f00] mx-auto text-4xl" />
          <h3 className="mt-2 mb-5">هل أنت متأكد من رغبتك بالمغادرة؟</h3>
          <div className="buttons">
            <button
              className="mr-5 hover:opacity-50 transition-opacity"
              onClick={() => setShowLeaveBox(false)}
            >
              إلغاء
            </button>
            <button
              className="bg-[#f00] text-white py-1 px-4 rounded-xl hover:bg-opacity-70 transition-colors"
              onClick={pageLeaveRoom}
            >
              تأكيد
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordTop;
