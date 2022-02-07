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
import { CSSTransition } from "react-transition-group";

import { leaveRoom } from "../../api/rooms";
import localPlayer from "../../api/socket";
import { HOST_TEMP } from "../../config/constants";
import { State } from "../../models/game";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { resetData } from "../../state/reducers/local";
import Alert from "../shared/Alert";
import WordTooltipIcon from "./shared/WordTooltipIcon";
import WordLogo from "./shared/WordLogo";
import classNames from "classnames";

interface WordTopProps {
  hideRounds?: boolean;
  hideShare?: boolean;
}

const WordTop: React.FC<WordTopProps> = ({ hideRounds, hideShare }) => {
  const game = useAppSelector((state) => state.gameSlice);
  const room = useAppSelector((state) => state.roomSlice);
  const nickname = useAppSelector((state) => state.localSlice.nickname);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showLeaveBox, setShowLeaveBox] = useState(false);
  const [showResetBox, setShowResetBox] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const roomId = game.id!;
  const isOwner = game.owner == nickname;

  async function pageLeaveRoom() {
    if (game.id) {
      await leaveRoom(nickname!, roomId);
      localPlayer.disconnect();
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
        <WordTooltipIcon text="خروج" className="left-[-5px]" addMargin={true}>
          <FaSignOutAlt
            onClick={() => !showResetBox && setShowLeaveBox(true)}
            className="inline text-[38px] text-[#f00] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#f00] hover:text-white"
          />
        </WordTooltipIcon>
        {game.owner == nickname &&
        game.state == State.LOBBY &&
        game.currentRound == 1 ? (
          <WordTooltipIcon
            text="الإعدادات"
            className="left-[-20px]"
            addMargin={true}
          >
            <FaCog
              className="inline text-[38px] text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
              onClick={() => {
                localPlayer.disconnect();
                router.push("/games/word/room?mode=edit");
              }}
            />
          </WordTooltipIcon>
        ) : null}
        {!hideShare && (
          <>
            {!showCheckIcon && (
              <WordTooltipIcon
                text="مشاركة"
                className="left-[-15px]"
                addMargin={true}
              >
                <FaShareAlt
                  className="inline text-[38px] text-[#00cc89] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
                  onClick={async () => {
                    if (navigator.canShare()) {
                      const shareData: ShareData = {
                        title: "Word | كلمة",
                        text: `Join this game of Word by ${nickname}!`,
                        url: `${HOST_TEMP}/games/word/${roomId}`,
                      };
                      await navigator.share(shareData);
                    } else {
                      navigator.clipboard.writeText(
                        `${HOST_TEMP}/games/word/${roomId}`
                      );
                    }

                    setShowCheckIcon(true);
                    setTimeout(() => {
                      setShowCheckIcon(false);
                    }, 1000);
                  }}
                />
              </WordTooltipIcon>
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
              <WordTooltipIcon
                text="إعادة اللعبة"
                className="left-[-30px] py-1"
                addMargin={true}
              >
                <FaRedoAlt
                  className="inline text-[32px] text-[#00cc89] -translate-y-[1px] bg-[#a0f3c0] rounded-full p-2 cursor-pointer transition-colors hover:bg-[#1a8c90] hover:text-white"
                  onClick={() => !showLeaveBox && setShowResetBox(true)}
                />
              </WordTooltipIcon>
            )}
          الجولة&nbsp;&nbsp;{" "}
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
