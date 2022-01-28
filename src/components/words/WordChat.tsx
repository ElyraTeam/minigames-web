import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import localPlayer from '../../api/socket';

interface WordChatProps {
  messages: ChatMessage[];
}

const WordChat: React.FC<WordChatProps> = ({ messages }) => {
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
    <div className="chat-main bg-[#38b77f] h-full sm:w-[35%] md:w-[30%] lg:w-[22%] rounded-l-2xl">
      <div className="messages h-[80%] flex flex-col justify-end">
        {messages.map((msg, i) => (
          <div className="message-cont text-right my-1 mx-2" key={i}>
            <p className="sender text-[#5ee494]">
              {msg.type == 'player' ? msg.sender : 'System'}
            </p>
            <p className="message break-words">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="type-message relative bg-[#2ca686] h-[20%] flex justify-center items-center rounded-bl-2xl">
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
          className="bg-transparent placeholder:text-white focus:outline-0 w-32 pb-2 border-b border-b-[.5px] border-[#63BCA5]"
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default WordChat;
