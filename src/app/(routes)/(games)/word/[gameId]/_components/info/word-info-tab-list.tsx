'use client';

import { useTranslations } from 'next-intl';

import TabItem from '@/components/ui/tab-item';
import TabList from '@/components/ui/tab-list';

import WordLeaderboard from './word-leaderboard';

interface WordInfoTabListProps {}

const WordInfoTabList: React.FC<WordInfoTabListProps> = ({}) => {
  const t = useTranslations('WordGame');

  return (
    <TabList
      parentClassName="flex flex-col overflow-y-auto flex-grow min-h-0 scrollbar-thin overflow-x-hidden"
      navClassName="sticky top-0 z-10"
      className="mx-5 mt-10 mb-5 rounded-xl bg-word-side-400/40"
      activeClassName="bg-word-side-200/80 rounded-xl shadow-md"
      tabSwitchClassName="p-3"
    >
      <TabItem
        label={t('currentRound')}
        className="
          scrollbar-none overflow-y-auto duration-300 animate-in
          slide-in-from-right-full
        "
      >
        <WordLeaderboard lastRound />
      </TabItem>
      <TabItem
        label={t('topPlayers')}
        className="
          scrollbar-none overflow-y-auto duration-300 animate-in
          slide-in-from-left-full
        "
      >
        <WordLeaderboard />
      </TabItem>
    </TabList>
  );
};

export default WordInfoTabList;
