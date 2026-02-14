import { MdOutlineChat } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

import WordChatSend from './word-chat-send';
import WordChatMessages from './word-chat-messages';
import { cn } from '@/lib/utils';

interface WordChatContainerProps {
  className?: string;
  onClose?: () => void;
  onAnimationEnd?: () => void;
}

const WordChatContainer: React.FC<WordChatContainerProps> = ({
  className,
  onClose,
  onAnimationEnd,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col h-full bg-gradient-to-t from-word-side-700 to-[190%] to-word-side-300 rounded-[20px] lg:rounded-2xl lg:border-[3px] overflow-hidden',
        className
      )}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="flex items-center justify-center gap-2 p-4 bg-word-side-200 shadow-[0px_4px_4px_0px_rgba(18,18,18,0.2)] relative">
        <span className="text-[22px]">الرسائل</span>
        <MdOutlineChat className="text-4xl" />
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <IoClose className="text-3xl opacity-60" />
          </button>
        )}
      </div>
      <div className="flex flex-col px-6 py-4 flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <WordChatMessages />
      </div>
      <div className="py-6 px-4 border-t border-white/5">
        <WordChatSend />
      </div>
    </div>
  );
};

export default WordChatContainer;
