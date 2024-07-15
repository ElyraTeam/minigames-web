import { cn } from '@/lib/utils';

import ListSocial from './list-social';

interface CreditProps {
  credit: UserCredit;
  className?: string;
}

const Credit: React.FC<CreditProps> = ({ credit, className }) => {
  const { name, facebookLink, linkedinLink, githubLink } = credit;
  return (
    <div className={cn('flex justify-between', className)}>
      <p>{name}</p>
      <ListSocial
        githubLink={githubLink}
        linkedinLink={linkedinLink}
        facebookLink={facebookLink}
      />
    </div>
  );
};

export default Credit;
