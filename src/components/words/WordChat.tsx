import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import localPlayer from "../../api/socket";
import { useAppSelector } from "../../state/hooks";

interface WordChatProps {
  addClass?: string
}

const WordChat: React.FC<WordChatProps> = ({ addClass }) => {
  const messages = useAppSelector((state) => state.chatSlice);
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function sendMessage(msg: string, key?: string) {
    if (msg === "" || msg === " ") return;
    if (key) {
      if (key !== "Enter") return;
    }

    localPlayer.chat(msg);

    setMessage("");
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={"chat-main flex flex-col h-full " + addClass}>
      <div className="messages justify-end overflow-y-scroll overflow-x-hidden scrollbar-thin flex-grow rounded-tl-2xl bg-[#38b880] max-h-[320px] max-w-[197px]">
        {messages.map((msg, i) => (
          <div
            className="message-cont text-right my-1 mx-2 text-[0.93rem]"
            key={i}
            dir="rtl"
          >
            {msg.type == "player" && (
              <p
                className={classNames(
                  "sender text-[#5ee494] font-semibold text-md",
                  {
                    //'text-[#fff] opacity-60': msg.type == 'system',
                  }
                )}
              >
                {msg.sender + (msg.sender == playerNickname ? " (انت)" : "")}
              </p>
            )}
            <p
              className={classNames("message break-words", {
                "text-white opacity-60": msg.type == "system",
                "font-bold": msg.font === "bold",
              })}
            >
              {msg.message}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="type-message relative bg-[#2ca686] flex justify-center items-center rounded-bl-2xl p-4">
        <MdSend
          className="scale-[-1] mr-1 text-[#005c44] cursor-pointer"
          onClick={(e) => sendMessage(message)}
        />
        <input
          type="text"
          placeholder="اكتب رسالة"
          value={message}
          onKeyPress={(e) => sendMessage(message, e.key)}
          onChange={(input) => setMessage(input.target.value)}
          className="bg-transparent placeholder:text-white focus:outline-none w-32 pb-2 border-b-[.5px] border-[#63BCA5]"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default WordChat;
