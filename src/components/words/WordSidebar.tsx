import { useState } from 'react';
import TabItem from '../shared/TabItem';
import WordChat from './WordChat';
import WordPlayers from './WordPlayers';

interface WordSidebarProps {
  hideChat?: boolean;
  hideScores?: boolean;
}

const WordSidebar: React.FC<WordSidebarProps> = ({ hideChat, hideScores }) => {
  const [tabIndex, setTabIndex] = useState(hideChat ? 1 : 0);

  let content = <WordChat addClass="height334" />;
  if (tabIndex == 1) {
    content = <WordPlayers />;
  }

  return (
    <div className="sidebar-main bg-[#38b77f] min-w-[197px] max-w-[197px] h-full rounded-l-2xl grid grid-rows-[auto_1fr]">
      {!hideChat && !hideScores && (
        <div className="flex mt-4">
          <TabItem active={tabIndex == 1} onClick={() => setTabIndex(1)}>
            اللاعبون
          </TabItem>
          <TabItem active={tabIndex == 0} onClick={() => setTabIndex(0)}>
            المحادثة
          </TabItem>
        </div>
      )}
      {content}
    </div>
  );
};

export default WordSidebar;
