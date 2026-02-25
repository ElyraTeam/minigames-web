import useOwner from '@/hooks/use-owner';

import WordLetter from './word-letter';

interface WordSelectLettersProps {
  alphabet: string[];
  chosenLetters: string[];
  doneLetters: string[];
  onLetterUpdate: (letter: string, checked: boolean) => void;
}

const WordSelectLetters: React.FC<WordSelectLettersProps> = ({
  alphabet,
  chosenLetters,
  doneLetters,
  onLetterUpdate,
}) => {
  const isOwner = useOwner();
  const isChecked = (letter: string) => chosenLetters.includes(letter);
  const isDone = (letter: string) => doneLetters.includes(letter);

  return (
    <div className="flex justify-center">
      <div className="
        grid grid-cols-4 gap-5
        lg:grid-cols-7 lg:gap-6
      ">
        {alphabet.map((letter) => (
        <WordLetter
          key={`word-letter-${letter}`}
          letter={letter}
          checked={isChecked(letter)}
          isDone={isDone(letter)}
          onChange={(e) => onLetterUpdate(letter, e.target.checked)}
          disabled={!isOwner}
        />
      ))}
      </div>
    </div>
  );
};

export default WordSelectLetters;
