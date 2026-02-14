import { cn } from '@/lib/utils';

interface CardProps extends React.ComponentProps<'div'> {
  className?: string;
}

const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'flex flex-col p-5 shadow-[0_2px_8px_0_rgba(0,0,0,0.35)]',
        className
      )}
      {...props}
    />
  );
};

export default Card;
