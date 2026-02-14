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
        `
          mx-4 cursor-pointer transition-colors
          hover:text-word-primary
        `,
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
