import { cn } from '@/lib/utils';
import Card from '@/components/ui/card';
import Overlay from '@/components/ui/overlay';

interface ModalProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  inactiveClassName?: string;
  onClose?: () => any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  className,
  inactiveClassName,
  onClose,
}) => {
  return (
    <>
      <Card
        className={cn(
          'fixed transition-transform duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-white text-black rounded-2xl font-normal text-base text-start',
          !isOpen && 'scale-0',
          !isOpen && inactiveClassName,
          className
        )}
      >
        {children}
      </Card>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

export default Modal;
