import { cn } from '@/lib/utils';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';

import CreditsList from './credits-list';

interface CreditsCardProps {
  showCredits: boolean;
  credits: UserCredit[];
  onClose?: () => any;
}

const CreditsCard: React.FC<CreditsCardProps> = ({
  showCredits,
  credits,
  onClose,
}) => {
  return (
    <Card
      className={cn(
        'fixed w-[30rem] bg-white text-black rounded-2xl transition-transform duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 space-y-4',
        !showCredits && 'scale-0'
      )}
    >
      <CreditsList credits={credits} />
      <Button
        variant="outline"
        className="px-8 py-2 text-md self-center"
        onClick={onClose}
      >
        إغلاق
      </Button>
    </Card>
  );
};

export default CreditsCard;
