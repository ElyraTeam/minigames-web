'use client';

import React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import TabItem, { TabItemProps } from './tab-item';

interface TabListProps {
  children: React.ReactNode;
  activeTabIndex?: number;
  className?: string;
  parentClassName?: string;
  tabSwitchClassName?: string;
  activeClassName?: string;
}

const TabList: React.FC<TabListProps> = ({
  children,
  activeTabIndex = 0,
  className,
  parentClassName,
  tabSwitchClassName,
  activeClassName,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type == TabItem
  );

  return (
    <div className={cn(parentClassName)}>
      <nav>
        <ul
          className={cn(
            'flex justify-center relative transition-transform',
            className
          )}
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => (
            <li className="w-full z-10" key={`tab-${index}`}>
              <button
                role="tab"
                aria-selected={activeTab === index}
                onClick={() => handleTabClick(index)}
                className={cn(
                  'text-sm w-full transition-opacity duration-200',
                  tabSwitchClassName,
                  activeTab !== index && 'opacity-30'
                )}
              >
                {tab.props.label}
              </button>
            </li>
          ))}
          <span
            className={cn(
              'absolute h-full left-0 transition-all duration-500',
              activeClassName
            )}
            style={{
              width: `${(1 / tabs.length) * 100}%`,
              translate: `${(tabs.length - 1 - activeTab) * 100}%`,
            }}
          />
        </ul>
      </nav>
      {tabs[activeTab]}
    </div>
  );
};

export default TabList;
