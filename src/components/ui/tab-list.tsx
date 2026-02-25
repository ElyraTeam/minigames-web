'use client';

import React, { useState, createContext } from 'react';
import { useLocale } from 'next-intl';

import { cn } from '@/lib/utils';

import TabItem, { TabItemProps } from './tab-item';

export const TabProvider = createContext<{
  activeTab: number;
}>({ activeTab: 0 });

interface TabListProps {
  children: React.ReactNode;
  activeTabIndex?: number;
  className?: string;
  parentClassName?: string;
  navClassName?: string;
  tabSwitchClassName?: string;
  inactiveTabSwitchClassName?: string;
  activeClassName?: string;
  onTabChange?: (index: number) => void;
}

const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex = 0,
  className,
  parentClassName,
  navClassName,
  tabSwitchClassName,
  inactiveTabSwitchClassName,
  activeClassName,
  onTabChange,
}) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [activeTab, setActiveTab] = useState(activeTabIndex);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type == TabItem,
  );

  return (
    <TabProvider.Provider value={{ activeTab }}>
      <div className={cn(parentClassName)}>
        <nav className={navClassName}>
          <ul
            className={cn(
              'relative flex justify-center transition-transform',
              className,
            )}
            role="tablist"
            aria-orientation="horizontal"
          >
            {tabs.map((tab, index) => (
              <li className="z-10 w-full" key={`tab-${index}`}>
                <button
                  role="tab"
                  aria-selected={activeTab === index}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    'w-full text-sm transition-opacity duration-200',
                    tabSwitchClassName,
                    activeTab !== index && 'opacity-30',
                    activeTab !== index && inactiveTabSwitchClassName,
                  )}
                >
                  {tab.props.label}
                </button>
              </li>
            ))}
            <span
              className={cn(
                'absolute start-0 h-full transition-all duration-500',
                activeClassName,
              )}
              style={{
                width: `${(1 / tabs.length) * 100}%`,
                translate: `${activeTab * (isRtl ? -1 : 1) * 100}%`,
              }}
            />
          </ul>
        </nav>
        {tabs[activeTab]}
      </div>
    </TabProvider.Provider>
  );
};

export default TabList;
