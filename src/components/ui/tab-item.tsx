import { cn } from '@/lib/utils';

export interface TabItemProps extends React.ComponentProps<'div'> {
  label: string;
}

const TabItem: React.FC<TabItemProps> = ({ className, ...props }) => {
  return <div role="tabpanel" className={cn(className)} {...props} />;
};

export default TabItem;
