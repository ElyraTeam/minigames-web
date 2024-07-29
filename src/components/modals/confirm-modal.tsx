import Button from '@/components/ui/button';

import Modal from './modal';

interface ConfirmModalProps {
  title?: string;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  isOpen?: boolean;
  loading?: boolean;
  confirmVariant?: 'danger' | 'warning';
  onClose?: () => any;
  onConfirm?: () => any;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  subtitle,
  icon,
  isOpen,
  loading,
  confirmVariant = 'danger',
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="py-8 px-16 space-y-8 text-center"
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
          نعم
        </Button>
        <Button
          variant="text"
          onClick={onClose}
          loading={loading}
          className="w-fit text-base"
        >
          لا
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
