import { cn } from '@/lib/utils';

import WordChatParts from './word-chat-parts';

interface WordChatMessageProps {
  sender?: string;
  content: ChatMessagePart[];
  self?: boolean;
  rounded?: boolean;
  spacing?: number;
}

const WordChatMessage: React.FC<WordChatMessageProps> = ({
  sender,
  content,
  self,
  rounded = true,
  spacing = 10,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 animate-in slide-in-from-bottom-1/2',
        !self && 'items-end'
      )}
      style={{ marginTop: spacing }}
    >
      {!self && sender && (
        <label className="text-sm opacity-60">{sender}</label>
      )}
      <p
        className={cn(
          'rounded-b-2xl rounded-tl-2xl px-4 py-2 bg-word-secondary w-fit text-wrap break-words max-w-full text-[14px] select-text',
          !self && 'bg-word-side rounded-tl-none rounded-tr-2xl',
          !rounded && 'rounded-tr-2xl rounded-tl-2xl'
        )}
      >
        <WordChatParts parts={content} />
      </p>
    </div>
  );
};

export default WordChatMessage;
