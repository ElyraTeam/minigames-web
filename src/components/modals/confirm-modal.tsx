import { useTranslations } from 'next-intl';

import Button from '@/components/ui/button';

import Modal from './modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => any;
  title?: string;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  confirmVariant?: 'danger' | 'warning';
  onConfirm?: () => any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  subtitle,
  icon,
  isOpen,
  loading,
  confirmVariant = 'danger',
  onOpenChange,
  onConfirm,
}) => {
  const t = useTranslations('Common');

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="px-16 py-8 text-center"
    >
      {icon}
      {title && <h4>{title}</h4>}
      {subtitle && <p>{subtitle}</p>}
      <div className="flex items-center justify-center gap-12">
        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          loading={loading}
          className="w-fit text-base"
        >
          {t('yes')}
        </Button>
        <Button
          variant="text"
          onClick={() => onOpenChange(false)}
          loading={loading}
          className="w-fit text-base"
        >
          {t('no')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
