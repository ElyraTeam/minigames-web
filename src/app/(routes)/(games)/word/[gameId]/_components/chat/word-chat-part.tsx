import { cn } from '@/lib/utils';

interface WordChatPartProps {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

const WordChatPart: React.FC<WordChatPartProps> = ({
  text,
  bold,
  italic,
  underline,
  color,
}) => {
  return (
    <span
      className={cn(
        bold && 'font-bold',
        italic && 'italic',
        underline && 'underline'
      )}
      style={{
        color: color,
      }}
    >
      {text}
    </span>
  );
};

export default WordChatPart;
