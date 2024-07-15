import { cn } from '@/lib/utils';

interface SocialLinkProps {
  link: string;
  className?: string;
  children?: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({
  link,
  className,
  children,
}) => {
  return (
    <a
      className={cn(
        'cursor-pointer mx-4 hover:text-primary transition-colors',
        className
      )}
      href={link}
      target="_blank"
    >
      {children}
    </a>
  );
};

export default SocialLink;
