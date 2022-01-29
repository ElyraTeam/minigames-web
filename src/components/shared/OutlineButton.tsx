import classNames from 'classnames';

interface OutlineButtonProps {
  className: string;
  onClick: () => void;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={classNames(
        'border-[2px] rounded-2xl py-1 px-6 text-light border-light font-semibold hover:bg-light hover:text-white transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
