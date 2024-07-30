import WordChatPart from './word-chat-part';

interface ChatPartsProps {
  parts: ChatMessagePart[];
}

const ChatParts: React.FC<ChatPartsProps> = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <WordChatPart
          key={part.id}
          text={part.text}
          bold={part.bold}
          italic={part.italic}
          underline={part.underline}
          color={part.color}
        />
      ))}
    </>
  );
};

export default ChatParts;
