'use client';

import { useState } from 'react';
import { BsSendFill } from 'react-icons/bs';

import { uid } from '@/lib/utils';
import localPlayer from '@/api/socket';
import useChatStore from '@/state/chat';

interface WordChatSendProps {}

const WordChatSend: React.FC<WordChatSendProps> = ({}) => {
  const [msg, setMessage] = useState('');
  const addChatMessage = useChatStore((state) => state.addChatMessage);

  const sendMessage = async () => {
    if (!msg || msg.trim().length == 0) return;
    if (msg === '/ping') {
      const ping = await localPlayer.getPing();
      addChatMessage({
        id: uid(),
        sender: 'system',
        type: 'system',
        parts: [
          { text: 'Your ping is: ' },
          { text: ping.toString(), bold: true },
          { text: ' ms' },
        ],
      });
    } else {
      localPlayer.chat(msg);
    }
    setMessage('');
  };

  return (
    <div className="flex items-center gap-3">
      <input
        className="
          min-w-0 flex-1 rounded-full border-2 border-word-side-200
          bg-transparent px-4 py-2 text-sm text-white transition-colors
          outline-none
          placeholder:text-white/60
          focus:border-word-secondary-300
        "
        placeholder="اكتب رسالة..."
        value={msg}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key == 'Enter' && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="
          flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center
          rounded-full bg-word-game-700 transition-colors
          hover:bg-word-game/80
          lg:size-10
        "
      >
        <BsSendFill className="
          -rotate-90 text-xl
          lg:text-lg
        " />
      </button>
    </div>
  );
};

export default WordChatSend;
