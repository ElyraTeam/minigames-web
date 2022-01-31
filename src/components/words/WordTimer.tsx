import classNames from 'classnames';

interface WordTimerProps {
  countdown: number;
  className?: string;
}

const WordTimer: React.FC<WordTimerProps> = ({ countdown, className }) => {
  return (
    <h3
      className={classNames(
        'timer text-8xl rounded-full w-40 h-40 justify-center items-center bg-light flex self-center',
        className
      )}
    >
      {countdown}
    </h3>
  );
};

export default WordTimer;
