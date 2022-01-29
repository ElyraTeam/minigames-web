import classNames from 'classnames';

interface CardProps {
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-col shadow-[0_2px_8px_0_rgba(0,0,0,0.35)] p-5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
