import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ModalProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  closeClassName?: string;
  onOpenChange?: (open: boolean) => any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  className,
  closeClassName,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('bg-white', className)}
        closeClassName={closeClassName}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
