import { CHARS_ARABIC } from '@/config/word';

import WordLetter from './word-letter';

interface WordSelectLettersProps {
  chosenLetters: string[];
  onLetterUpdate: (letter: string, checked: boolean) => any;
}

const WordSelectLetters: React.FC<WordSelectLettersProps> = ({
  chosenLetters,
  onLetterUpdate,
}) => {
  const isChecked = (letter: string) => chosenLetters.includes(letter);

  return (
    <div className="flex flex-wrap justify-center items-end gap-y-0 gap-x-4 px-12">
      {CHARS_ARABIC.map((letter) => (
        <WordLetter
          key={`word-letter-${letter}`}
          letter={letter}
          checked={isChecked(letter)}
          onChange={(e) => onLetterUpdate(letter, e.target.checked)}
        />
      ))}
    </div>
  );
};

export default WordSelectLetters;
