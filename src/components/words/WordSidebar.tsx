import { useState } from 'react';
import TabItem from '../shared/TabItem';
import WordChat from './WordChat';
import WordLeaderboard from './WordLeaderboard';

interface WordSidebarProps {
  hideChat?: boolean;
  hideScores?: boolean;
}

const WordSidebar: React.FC<WordSidebarProps> = ({ hideChat, hideScores }) => {
  const [tabIndex, setTabIndex] = useState(hideChat ? 1 : 0);

  let content = <WordChat />;
  if (tabIndex == 1) {
    content = <WordLeaderboard />;
  }

  return (
    <div className="sidebar-main bg-[#38b77f] h-full sm:w-[35%] md:w-[30%] lg:w-[40%] rounded-l-2xl grid grid-rows-[auto_1fr]">
      {!hideChat && !hideScores && (
        <div className="flex mt-4">
          <TabItem active={tabIndex == 0} onClick={() => setTabIndex(0)}>
            المحادثة
          </TabItem>
          <TabItem active={tabIndex == 1} onClick={() => setTabIndex(1)}>
            المتصدرين
          </TabItem>
        </div>
      )}
      {content}
    </div>
  );
};

export default WordSidebar;
