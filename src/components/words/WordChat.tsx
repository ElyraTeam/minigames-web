import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import localPlayer from '../../api/socket';
import { useAppSelector } from '../../state/hooks';

interface WordChatProps { }

const WordChat: React.FC<WordChatProps> = ({ }) => {
  const messages = useAppSelector((state) => state.chatSlice);
  const [message, setMessage] = useState('');

  function sendMessage(msg: string, key?: string) {
    if (msg === '' || msg === ' ') return;
    if (key) {
      if (key !== 'Enter') return;
    }

    localPlayer.chat(msg);

    setMessage('');
  }

  return (
    <div className="chat-main flex flex-col h-full">
      <div className="messages justify-end overflow-y-scroll overflow-x-hidden scrollbar-thin flex-grow rounded-tl-3xl bg-[#38b880] max-h-[335px]">
        {messages.map((msg, i) => (
          <div className="message-cont text-right my-1 mx-2" key={i}>
            <p className="sender text-[#5ee494]">
              {msg.type == 'player' ? msg.sender : 'System'}
            </p>
            <p className="message break-words">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="type-message relative bg-[#2ca686] flex justify-center items-center rounded-bl-2xl p-2">
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
          className="bg-transparent placeholder:text-white focus:outline-0 w-32 pb-2 border-b-[.5px] border-[#63BCA5]"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default WordChat;
