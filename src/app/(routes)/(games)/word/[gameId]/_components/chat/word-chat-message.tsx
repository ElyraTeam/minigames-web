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
        self ? 'items-start' : 'items-end'
      )}
      style={{ marginTop: spacing }}
    >
      {sender && (
        <label className={cn('text-[15px] opacity-60', !self && 'text-end')}>
          {sender} {self && '(أنت)'}
        </label>
      )}
      <p
        className={cn(
          'px-4 py-2 w-fit text-wrap wrap-break-word max-w-full text-[17px] select-text rounded-t-[15px]',
          self ? 'bg-word-secondary rounded-bl-[15px]' : 'bg-white text-black rounded-br-[15px]'
        )}
      >
        <WordChatParts parts={content} />
      </p>
    </div>
  );
};

export default WordChatMessage;
