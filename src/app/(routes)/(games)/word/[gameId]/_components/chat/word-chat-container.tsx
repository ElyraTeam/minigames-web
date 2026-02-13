import { MdMessage } from 'react-icons/md';

import WordChatSend from './word-chat-send';
import WordSideCard from '../word-side-card';
import WordChatMessages from './word-chat-messages';
import WordSideCardHeader from '../word-side-card-header';
import { cn } from '@/lib/utils';

interface WordChatContainerProps {
  className?: string;
}

const WordChatContainer: React.FC<WordChatContainerProps> = ({ className }) => {
  return (
    <WordSideCard className={cn('flex flex-col', className)}>
      <WordSideCardHeader className="space-x-1 rtl:space-x-reverse">
        <span>الرسائل</span> <MdMessage className="text-2xl inline" />
      </WordSideCardHeader>
      <div className="flex flex-col mt-4 px-4 pt-10 pb-6 h-full overflow-y-auto scrollbar-thin">
        <WordChatMessages />
      </div>
      <div className="py-4 px-4 border-t-2 border-white/10">
        <WordChatSend />
      </div>
    </WordSideCard>
  );
};

export default WordChatContainer;
