'use client';

import { useEffect, useRef } from 'react';

import useChatStore from '@/state/chat';
import useLocalStore from '@/state/local';

import WordChatMessage from './word-chat-message';

interface WordChatMessagesProps {}

const WordChatMessages: React.FC<WordChatMessagesProps> = ({}) => {
  const messages = useChatStore((state) => state.messages);
  const nickname = useLocalStore((state) => state.nickname);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (msg: ChatMessage, index: number) => {
    const previousMessage = index >= 1 && messages[index - 1];
    const sender =
      previousMessage && previousMessage.sender == msg.sender
        ? undefined
        : msg.sender;
    return (
      <WordChatMessage
        key={msg.id}
        content={msg.message}
        self={nickname === msg.sender}
        sender={sender}
      />
    );
  };

  return (
    <>
      <div className="space-y-4 flex flex-col justify-end flex-grow">
        {messages.map((chatMsg, i) =>
          chatMsg.type !== 'system' ? (
            renderMessage(chatMsg, i)
          ) : (
            <p key={i} className="text-center text-sm text-white/30">
              {chatMsg.message}
            </p>
          )
        )}
      </div>
      <div ref={messagesEndRef} />
    </>
  );
};

export default WordChatMessages;
