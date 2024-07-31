import { useState } from 'react';
import toast from 'react-hot-toast';

import Input from '@/components/ui/input';
import { sendFeedback } from '@/api/rooms';
import Button from '@/components/ui/button';
import Modal from '@/components/modals/modal';
import TextArea from '@/components/ui/text-area';

interface WordFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const WordFeedback: React.FC<WordFeedbackProps> = ({ isOpen, onClose }) => {
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
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="space-y-6 w-[450px] p-8"
    >
      <h4>ايه المشكلة يصاحبي؟</h4>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleFeedback();
        }}
      >
        <div className="space-y-2">
          <label>ايميلك ايه؟</label>
          <Input
            type="email"
            className="focus:border-word-game-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <label>اسمك ايه؟</label>
          <Input
            className="focus:border-word-game-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label>رسالتك ايه؟</label>
          <TextArea
            className="h-32 focus:border-word-game-700"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button>ارسال</Button>
      </form>
    </Modal>
  );
};

export default WordFeedback;
