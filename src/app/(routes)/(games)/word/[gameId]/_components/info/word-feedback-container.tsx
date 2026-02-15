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
      <div className="
        flex items-center justify-center gap-3 bg-word-side-400 px-3 py-8
        text-center text-sm font-light shadow-2xl
      ">
        <p>واجهتك مشكلة؟</p>
        <p
          className="
            cursor-pointer rounded-full border border-word-game px-4 py-1
            text-word-game
          "
          onClick={() => setFeedbackModalShow(true)}
        >
          تواصل معنا
        </p>
      </div>
    </>
  );
};

export default WordFeedbackContainer;
