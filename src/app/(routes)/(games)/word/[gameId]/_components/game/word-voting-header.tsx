import useVoteStore from '@/state/vote';
import useRoomStore from '@/state/room';
import Tooltip from '@/components/ui/tooltip';

import WordContentHeader from '../word-content-header';

interface WordVotingHeaderProps {}

const WordVotingHeader: React.FC<WordVotingHeaderProps> = ({}) => {
  const categoriesLength =
    useRoomStore((state) => state.options?.options?.categories.length) || 0;
  const categoryData = useVoteStore((state) => state.categoryVoteData);

  return (
    <WordContentHeader className="flex flex-col p-0">
      <div className="flex justify-center items-center gap-3 pt-6 pb-5">
        <p className="text-2xl">صوت للإجابات الصحيحة </p>
        <Tooltip
          text={
            <div>
              <h6 className="text-center font-bold mb-3">طريقة التصويت</h6>
              <p className="leading-[1.8]">
                صوت بـ<span className="text-[#1e8893] font-bold">10</span>{' '}
                للكلمة الصحيحة الغير مكررة
              </p>
              <p className="leading-[1.8]">
                صوت بـ<span className="text-[#1e8893] font-bold">5</span> للكلمة
                الصحيحة المكررة
              </p>
              <p className="leading-[1.8]">
                صوت بـ<span className="text-[#1e8893] font-bold">0</span> للكلمة
                الغير صحيحة
              </p>
            </div>
          }
        >
          <p className="text-xl bg-word-game p-2 rounded-full font-bold w-7 h-7 flex flex-col items-center justify-center">
            ?
          </p>
        </Tooltip>
      </div>
      <div className="text-lg flex gap-3 self-center bg-white/15 w-fit rounded-t-xl py-1 px-10">
        <p className="font-bold">{categoryData?.category}</p>
        <div className="flex items-center">
          <p>{(categoryData?.categoryIndex || 0) + 1}</p>
          <p className="text-sm opacity-60">/{categoriesLength}</p>
        </div>
      </div>
    </WordContentHeader>
  );
};

export default WordVotingHeader;
