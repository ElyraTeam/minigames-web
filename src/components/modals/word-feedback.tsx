import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import Input from '@/components/ui/input';
import { sendFeedback } from '@/api/rooms';
import Modal from '@/components/modals/modal';
import TextArea from '@/components/ui/text-area';

import WordButton from '../word/word-button';

interface WordFeedbackProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ValidationErrors {
  email?: string;
  name?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

const WordFeedback: React.FC<WordFeedbackProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const t = useTranslations('WordFeedback');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'email':
        if (!value.trim()) return t('emailRequired');
        if (!EMAIL_REGEX.test(value)) return t('emailInvalid');
        return undefined;
      case 'name':
        if (!value.trim()) return t('nameRequired');
        if (value.trim().length < MIN_NAME_LENGTH)
          return t('nameMinLength', { min: MIN_NAME_LENGTH });
        return undefined;
      case 'message':
        if (!value.trim()) return t('messageRequired');
        if (value.trim().length < MIN_MESSAGE_LENGTH)
          return t('messageMinLength', { min: MIN_MESSAGE_LENGTH });
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {
      email: validateField('email', email),
      name: validateField('name', name),
      message: validateField('message', message),
    };
    setErrors(newErrors);
    setTouched({ email: true, name: true, message: true });
    return !newErrors.email && !newErrors.name && !newErrors.message;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, field === 'email' ? email : field === 'name' ? name : message),
    }));
  };

  const handleFeedback = async () => {
    if (loading) return;
    if (!validateAll()) return;

    setLoading(true);
    try {
      await sendFeedback(email, name, message);
      toast.success(t('successMessage'));
      setEmail('');
      setName('');
      setMessage('');
      setErrors({});
      setTouched({});
      onOpenChange(false);
    } catch (err) {
      toast.error(t('errorMessage'));
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="
        w-[90%]
        lg:w-[450px]
      "
    >
      <h4>{t('title')}</h4>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleFeedback();
        }}
      >
        <div className="flex flex-col gap-2">
          <label>{t('email')}</label>
          <Input
            type="email"
            className={`
              border border-black/40
              focus:border-word-game-600
              ${touched.email && errors.email ? `border-red-500` : ''}
            `}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            dir="ltr"
          />
          {touched.email && errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>{t('name')}</label>
          <Input
            className={`
              border border-black/40
              focus:border-word-game-600
              ${touched.name && errors.name ? `border-red-500` : ''}
            `}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
          />
          {touched.name && errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>{t('message')}</label>
          <TextArea
            className={`
              h-32 border border-black/40
              focus:border-word-game-600
              ${touched.message && errors.message ? `border-red-500` : ''}
            `}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleBlur('message')}
          />
          {touched.message && errors.message && (
            <span className="text-sm text-red-500">{errors.message}</span>
          )}
        </div>
        <WordButton variant="regular">
          {t('send')}
        </WordButton>
      </form>
    </Modal>
  );
};

export default WordFeedback;
