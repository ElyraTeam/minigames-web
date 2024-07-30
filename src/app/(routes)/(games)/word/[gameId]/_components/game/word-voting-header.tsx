import useVoteStore from '@/state/vote';
import useRoomStore from '@/state/room';
import Tooltip from '@/components/ui/tooltip';

interface WordVotingHeaderProps {}

const WordVotingHeader: React.FC<WordVotingHeaderProps> = ({}) => {
  const categoriesLength =
    useRoomStore((state) => state.options?.options?.categories.length) || 0;
  const categoryData = useVoteStore((state) => state.categoryVoteData);

  return (
    <div className="text-base lg:text-lg flex gap-5 items-center self-center bg-white/15 w-fit rounded-b-2xl pt-2 px-12 pb-2 shadow-lg">
      <Tooltip
        text={
          <div className="text-sm lg:text-base">
            <h6 className="text-base lg:text-lg text-center font-bold mb-3">
              طريقة التصويت
            </h6>
            <p className="leading-[1.8]">
              صوت بـ<span className="text-[#1e8893] font-bold">10</span> للكلمة
              الصحيحة الغير مكررة
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
        <p className="text-sm lg:text-lg bg-word-game p-2 rounded-full font-bold w-6 h-6 lg:w-5 lg:h-5 flex flex-col items-center justify-center">
          ?
        </p>
      </Tooltip>
      <p className="font-bold">{categoryData?.category}</p>
      <div className="flex items-center">
        <p className="font-bold">{(categoryData?.categoryIndex || 0) + 1}</p>
        <p className="opacity-60">/{categoriesLength}</p>
      </div>
    </div>
  );
};

export default WordVotingHeader;
