import Image from "next/image";
import router, { useRouter } from "next/router";
import { useState } from "react";
import {
  FaSignOutAlt,
  FaCog,
  FaShareAlt,
  FaExclamationTriangle,
  FaCheck,
  FaRedoAlt,
} from "react-icons/fa";

import { leaveRoom } from "../../api/rooms";
import localPlayer from "../../api/socket";
import { HOST_TEMP } from "../../config/constants";
import { State } from "../../models/game";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { resetData } from "../../state/reducers/local";
import WordLogo from "./shared/WordLogo";

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

  return (
    <div className="top-info relative">
      <WordLogo />

      <div className="icons xs:my-4 sm:absolute bottom-3 left-12">
        <FaSignOutAlt
          onClick={() => setShowLeaveBox(true)}
          className="inline text-[38px] mr-6 text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#f00] hover:text-white"
        />
        {game.owner == nickname &&
          game.state == State.LOBBY &&
          game.currentRound == 1 ? (
          <FaCog
            className="inline text-[38px] mr-6 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
            onClick={() => router.push("/games/word/room?mode=edit")}
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

        {game.state != State.GAME_OVER &&
          game.state != State.WAITING &&
          (game.currentRound || 1) > 1 &&
          isOwner && (
            <FaRedoAlt
              className="inline text-[38px] mr-6 text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
              onClick={() => setShowResetBox(true)}
            />
          )}
      </div>

      {!hideRounds && (
        <h2 className="rounds sm:absolute text-3xl right-8 bottom-3 font-bold">
          الجولة&nbsp;&nbsp;{" "}
          <span className="game-rounds">{room.options?.rounds}</span>/
          <span className="current-round text-secondary">
            {(game.currentRound || 1) - (game.state == State.LOBBY ? 1 : 0)}
          </span>
        </h2>
      )}

      {(showLeaveBox || showResetBox) && (
        <div className="leave-box absolute w-[400px] shadow-2xl rounded-2xl text-center text-black p-5 top-1/2 left-1/2 -translate-x-1/2 bg-white z-50">
          <FaExclamationTriangle className="text-[#f00] mx-auto text-4xl" />
          <h3 className="mt-2 mb-5">
            {showLeaveBox
              ? "هل أنت متأكد من رغبتك بالمغادرة؟"
              : "هل أنت متأكد من اعادة اللعبة؟"}
          </h3>
          <div className="buttons">
            <button
              className="mr-5 hover:opacity-50 transition-opacity"
              onClick={() => {
                setShowLeaveBox(false);
                setShowResetBox(false);
              }}
            >
              إلغاء
            </button>
            <button
              className="bg-[#f00] text-white py-1 px-4 rounded-xl hover:bg-opacity-70 transition-colors"
              onClick={showResetBox ? localPlayer.resetGame : pageLeaveRoom}
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
