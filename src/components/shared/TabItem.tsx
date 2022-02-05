import classNames from 'classnames';

interface TabItemProps {
  onClick: () => void;
  active?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ active, children, onClick }) => {
  return (
    <span
      className={classNames('cursor-pointer flex-grow pb-2 transition-colors', {
        'text-[#6efc75] border-b-2 border-[#6efc75]': active,
      })}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default TabItem;
