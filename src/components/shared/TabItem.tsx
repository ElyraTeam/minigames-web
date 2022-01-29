import classNames from 'classnames';

interface TabItemProps {
  onClick: () => void;
  active?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ active, children, onClick }) => {
  return (
    <span
      className={classNames('cursor-pointer flex-grow pb-2 transition-colors', {
        'text-light border-b-2': active,
      })}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default TabItem;
