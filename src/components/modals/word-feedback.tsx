import { useState } from 'react';
import toast from 'react-hot-toast';

import Input from '@/components/ui/input';
import { sendFeedback } from '@/api/rooms';
import Modal from '@/components/modals/modal';
import TextArea from '@/components/ui/text-area';

import WordButton from '../word/word-button';

interface WordFeedbackProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WordFeedback: React.FC<WordFeedbackProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFeedback = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await sendFeedback(email, name, message);
      toast.success('مشكلتك اتبعتت وهتتحل في اسرع وقت');
    } catch (err) {
      toast.error('مشكلة حصلت');
      console.error(err);
    }
    setLoading(false);
    setEmail('');
    setName('');
    setMessage('');
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="w-[90%] lg:w-[450px]"
    >
      <h4>ما هي مشكلتك؟</h4>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleFeedback();
        }}
      >
        <div className="space-y-2">
          <label>الايميل</label>
          <Input
            type="email"
            className="focus:border-word-game-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <label>الاسم</label>
          <Input
            className="focus:border-word-game-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label>الرسالة</label>
          <TextArea
            className="h-32 focus:border-word-game-700"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <WordButton
          variant="outline"
          className="hover:bg-word-game-600 hover:text-white"
        >
          ارسال
        </WordButton>
      </form>
    </Modal>
  );
};

export default WordFeedback;
