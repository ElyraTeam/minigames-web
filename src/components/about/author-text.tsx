import { cn } from '@/lib/utils';
import { TEAM_NAME_EN } from '@/config/constants';

interface AuthorTextProps extends React.ComponentProps<'span'> {}

const AuthorText: React.FC<AuthorTextProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        `
          gradient cursor-pointer bg-linear-to-tr from-teamgradient-from
          to-teamgradient-to bg-clip-text font-bold text-transparent opacity-80
          transition-opacity
          hover:opacity-100
        `,
        className
      )}
      {...props}
    >
      {TEAM_NAME_EN}
    </span>
  );
};

export default AuthorText;
