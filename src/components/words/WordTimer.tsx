interface WordTimerProps {
  countdown: number;
}

const WordTimer: React.FC<WordTimerProps> = ({ countdown }) => {
  return (
    <h3 className="timer text-8xl rounded-full w-40 h-40 relative left-[50%] translate-x-[-50%] justify-center items-center bg-light flex">
      {countdown}
    </h3>
  );
};

export default WordTimer;
