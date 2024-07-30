'use client';

import { useState } from 'react';
import { MdSend } from 'react-icons/md';

import { uid } from '@/lib/utils';
import localPlayer from '@/api/socket';
import useChatStore from '@/state/chat';
import Input from '@/components/ui/input';

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
    <Input
      className="border-word-side-200 focus:border-word-secondary-300"
      placeholder="اكتب رسالة..."
      icon={<MdSend className="text-xl rotate-180" />}
      onIconClick={sendMessage}
      value={msg}
      onChange={(e) => setMessage(e.target.value)}
      onKeyUp={(e) => e.key == 'Enter' && sendMessage()}
    />
  );
};

export default WordChatSend;
