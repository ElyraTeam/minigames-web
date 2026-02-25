'use client';

import { MdOutlineChat } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

import WordChatSend from './word-chat-send';
import WordChatMessages from './word-chat-messages';
import { cn } from '@/lib/utils';

interface WordChatContainerProps extends React.ComponentProps<'div'> {
  onClose?: () => void;
}

const WordChatContainer: React.FC<WordChatContainerProps> = ({
  className,
  onClose,
  ...props
}) => {
  const t = useTranslations('WordChat');

  return (
    <div
      className={cn(
        `
          flex h-full flex-col overflow-hidden rounded-[20px] bg-linear-to-t
          from-word-side-700 to-word-side-300 to-190%
          lg:rounded-2xl lg:border-[3px]
        `,
        className
      )}
      {...props}
    >
      <div className="
        relative flex items-center justify-center gap-2 bg-word-side-200 p-4
        shadow-[0px_4px_4px_0px_rgba(18,18,18,0.2)]
      ">
        <span className="text-[22px]">{t('messages')}</span>
        <MdOutlineChat className="text-4xl" />
        {onClose && (
          <button
            onClick={onClose}
            className="
              absolute right-4 flex size-10 cursor-pointer items-center
              justify-center transition-opacity
              hover:opacity-80
            "
          >
            <IoClose className="text-3xl opacity-60" />
          </button>
        )}
      </div>
      <div className="
        scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-4
      ">
        <WordChatMessages />
      </div>
      <div className="border-t border-white/5 px-4 py-6">
        <WordChatSend />
      </div>
    </div>
  );
};

export default WordChatContainer;
