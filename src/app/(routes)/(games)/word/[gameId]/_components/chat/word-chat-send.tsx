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
        className="flex-1 min-w-0 rounded-full bg-transparent outline-none border-2 border-word-side-200 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:border-word-secondary-300 transition-colors"
        placeholder="اكتب رسالة..."
        value={msg}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key == 'Enter' && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-word-game-700 shrink-0 cursor-pointer hover:bg-word-game/80 transition-colors"
      >
        <BsSendFill className="text-xl lg:text-lg -rotate-90" />
      </button>
    </div>
  );
};

export default WordChatSend;
