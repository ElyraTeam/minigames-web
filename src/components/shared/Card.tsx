import classNames from 'classnames';

interface CardProps {
  dir?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, dir, className }) => {
  return (
    <div
      dir={dir}
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
