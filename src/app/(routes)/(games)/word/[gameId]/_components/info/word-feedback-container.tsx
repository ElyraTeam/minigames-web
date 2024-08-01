'use client';

import { useState } from 'react';

import WordFeedback from '@/components/modals/word-feedback';

interface WordFeedbackContainerProps {}

const WordFeedbackContainer: React.FC<WordFeedbackContainerProps> = ({}) => {
  const [feedbackModalShow, setFeedbackModalShow] = useState(false);

  return (
    <>
      <WordFeedback
        isOpen={feedbackModalShow}
        onOpenChange={(open) => setFeedbackModalShow(open)}
      />
      <div className="py-8 px-3 text-center font-light flex gap-2 justify-center text-sm shadow-[0px_-10px_10px_rgba(0,0,0,0.1)]">
        <p>واجهتك مشكلة؟</p>
        <p
          className="underline text-word-game cursor-pointer"
          onClick={() => setFeedbackModalShow(true)}
        >
          تواصل معنا
        </p>
      </div>
    </>
  );
};

export default WordFeedbackContainer;
