import { FaTools } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

import Modal from './modal';

interface MaintenanceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const t = useTranslations('Maintenance');

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="flex flex-col items-center justify-center gap-8 p-16"
    >
      <div className="flex items-center gap-3 text-warning">
        <FaTools className="text-3xl" />
        <h3 className="font-bold">{t('title')}</h3>
      </div>
      <p>{t('message')}</p>
    </Modal>
  );
};

export default MaintenanceModal;
