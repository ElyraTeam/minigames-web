'use client';

import { useEffect, useRef } from 'react';
import { LuMessageCircle } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

import useChatStore from '@/state/chat';
import useLocalStore from '@/state/local';

import ChatParts from './word-chat-parts';
import WordChatMessage from './word-chat-message';

interface WordChatMessagesProps {}

const WordChatMessages: React.FC<WordChatMessagesProps> = ({}) => {
  const t = useTranslations('WordChat');
  const messages = useChatStore((state) => state.messages);
  const nickname = useLocalStore((state) => state.nickname);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current)
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    setTimeout(() => scrollToBottom(), 400);
    scrollToBottom();
  }, [messagesEndRef, messages]);

  const renderMessage = (msg: ChatMessage, index: number) => {
    const previousMessage = index >= 1 && messages[index - 1];
    const sender =
      previousMessage && previousMessage.sender == msg.sender
        ? undefined
        : msg.sender;
    return (
      <WordChatMessage
        key={msg.id}
        content={msg.parts}
        self={nickname === msg.sender}
        sender={sender}
        rounded={!!sender}
        spacing={!!sender ? 16 : 8}
      />
    );
  };

  return (
    <>
      {messages.length !== 0 && (
        <div className="flex grow flex-col justify-end">
          {messages.map((chatMsg, i) =>
            chatMsg.type !== 'system' ? (
              renderMessage(chatMsg, i)
            ) : (
              <p key={i} className="mt-4 text-center text-sm text-white/30">
                <ChatParts parts={chatMsg.parts} />
              </p>
            )
          )}
        </div>
      )}
      {messages.length === 0 && (
        <div className="
          my-auto flex flex-col items-center justify-center gap-2 text-white/30
        ">
          <LuMessageCircle className="text-3xl" />
          <p className="text-[15px]">{t('noMessages')}</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  );
};

export default WordChatMessages;
