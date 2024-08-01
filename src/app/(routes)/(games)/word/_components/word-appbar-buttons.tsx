import WordHomeContact from './word-home-contact';
import WordAppbarNickname from './word-appbar-nickname';

interface WordAppbarButtonsProps {}

const WordAppbarButtons: React.FC<WordAppbarButtonsProps> = ({}) => {
  return (
    <>
      <WordAppbarNickname />
      <WordHomeContact />
    </>
  );
};

export default WordAppbarButtons;
