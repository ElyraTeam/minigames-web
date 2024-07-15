import { cn } from '@/lib/utils';
import { TEAM_NAME_EN } from '@/config/constants';

interface AuthorTextProps extends React.ComponentProps<'span'> {}

const AuthorText: React.FC<AuthorTextProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        'text-transparent bg-clip-text bg-gradient-to-tr from-teamgradient-from to-teamgradient-to gradient cursor-pointer opacity-80 hover:opacity-100 font-bold transition-opacity',
        className
      )}
      {...props}
    >
      {TEAM_NAME_EN}
    </span>
  );
};

export default AuthorText;
