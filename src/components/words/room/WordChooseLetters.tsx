import { CHARS_ARABIC } from '../../../config/word';

interface WordChooseLettersProps {
  charsSelected: string[];
  charClick: (char: string) => void;
}

const WordChooseLetters: React.FC<WordChooseLettersProps> = ({
  charsSelected,
  charClick,
}) => {
  return (
    <div className="chars flex flex-wrap xs:justify-center" dir="rtl">
      {CHARS_ARABIC.map((char) => {
        return (
          <div
            key={CHARS_ARABIC.indexOf(char)}
            onClick={() => charClick(char)}
            className={
              'py-2 px-3 text-lg m-2 bg-white cursor-pointer rounded-full font-semibold flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] transition-colors w-10 ' +
              (charsSelected.includes(char) ? 'active' : '')
            }
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default WordChooseLetters;
