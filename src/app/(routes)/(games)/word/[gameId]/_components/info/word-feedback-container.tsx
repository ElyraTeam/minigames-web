import Link from 'next/link';

interface WordFeedbackContainerProps {}

const WordFeedbackContainer: React.FC<WordFeedbackContainerProps> = ({}) => {
  return (
    <div className="py-8 px-3 text-center font-light flex gap-2 justify-center text-sm shadow-[0px_-10px_10px_rgba(0,0,0,0.1)]">
      <p>واجهتك مشكلة؟</p>
      <Link href="/" className="underline text-word-game">
        تواصل معنا
      </Link>
    </div>
  );
};

export default WordFeedbackContainer;
