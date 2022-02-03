import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FaSignOutAlt,
  FaCog,
  FaShareAlt,
  FaExclamationTriangle,
  FaCheck,
  FaRedoAlt,
} from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

import { leaveRoom } from '../../api/rooms';
import localPlayer from '../../api/socket';
import { HOST_TEMP } from '../../config/constants';
import { State } from '../../models/game';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { resetData } from '../../state/reducers/local';
import Alert from '../shared/Alert';
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
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showLeaveBox, setShowLeaveBox] = useState(false);
  const [showResetBox, setShowResetBox] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const roomId = game.id!;
  const isOwner = game.owner == playerNickname;

  async function pageLeaveRoom() {
    if (game.id) {
      await leaveRoom(nickname, roomId);
    }
    router.replace(`/games/word`);
    dispatch(resetData());
  }

  function resetGame() {
    localPlayer.resetGame();
    setShowResetBox(false);
  }

  return (
    <div className="top-info relative">
      <WordLogo />

      <div className="icons xs:my-4 sm:absolute bottom-3 left-12">
        <FaSignOutAlt
          onClick={() => !showResetBox && setShowLeaveBox(true)}
          className="inline text-[38px] mr-6 text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#f00] hover:text-white"
        />
        {game.owner == nickname &&
        game.state == State.LOBBY &&
        game.currentRound == 1 ? (
          <FaCog
            className="inline text-[38px] mr-6 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
            onClick={() => router.push('/games/word/room?mode=edit')}
          />
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
          {game.state != State.GAME_OVER &&
            game.state != State.WAITING &&
            (game.currentRound || 1) >= 1 &&
            isOwner && (
              <FaRedoAlt
                className="inline text-[32px] mr-6 text-[#00cc89] -translate-y-[1px] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
                onClick={() => !showLeaveBox && setShowResetBox(true)}
              />
            )}
          الجولة&nbsp;&nbsp;{' '}
          <span className="game-rounds">{room.options?.rounds}</span>/
          <span className="current-round text-secondary">
            {(game.currentRound || 1) - (game.state == State.LOBBY ? 1 : 0)}
          </span>
        </h2>
      )}

      <Alert
        body="هل أنت متأكد من رغبتك بالمغادرة؟"
        show={showLeaveBox && !showResetBox}
        onConfirm={pageLeaveRoom}
        onCancel={() => setShowLeaveBox(false)}
      />
      <Alert
        body="هل أنت متأكد من اعادة اللعبة؟"
        onConfirm={resetGame}
        show={showResetBox && !showLeaveBox}
        onCancel={() => setShowResetBox(false)}
      />
    </div>
  );
};

export default WordTop;
