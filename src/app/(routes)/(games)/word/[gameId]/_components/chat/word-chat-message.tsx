import { cn } from '@/lib/utils';

interface WordChatMessageProps {
  sender?: string;
  content: string;
  self?: boolean;
}

const WordChatMessage: React.FC<WordChatMessageProps> = ({
  sender,
  content,
  self,
}) => {
  return (
    <div className={cn('flex flex-col gap-2', !self && 'items-end')}>
      {!self && sender && (
        <label className="text-sm opacity-60">{sender}</label>
      )}
      <p
        className={cn(
          'rounded-b-2xl rounded-tl-2xl px-4 py-2 bg-word-secondary w-fit text-wrap break-words max-w-full text-[14px]',
          !self && 'bg-word-side-400 rounded-tl-none rounded-tr-2xl'
        )}
      >
        {content}
      </p>
    </div>
  );
};

export default WordChatMessage;
