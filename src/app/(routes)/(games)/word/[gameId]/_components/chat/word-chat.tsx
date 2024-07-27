import WordChatContainer from './word-chat-container';
import WordMobileChat from './word-mobile-chat';

interface WordChatProps {}

const WordChat: React.FC<WordChatProps> = ({}) => {
  return (
    <>
      <WordChatContainer className="hidden lg:flex" />
      <WordMobileChat className="lg:hidden" />
    </>
  );
};

export default WordChat;
