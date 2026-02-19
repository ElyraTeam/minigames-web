import useVoteStore from '@/state/vote';
import useRoomStore from '@/state/room';
import Tooltip from '@/components/ui/tooltip';

interface WordVotingHeaderProps {}

const WordVotingHeader: React.FC<WordVotingHeaderProps> = ({}) => {
  const categoriesLength =
    useRoomStore((state) => state.options?.options?.categories.length) || 0;
  const categoryData = useVoteStore((state) => state.categoryVoteData);

  return (
    <div
      className="
       relative flex w-fit items-center gap-5 self-center rounded-b-2xl bg-white/15
        px-12 pt-2 pb-2 text-base shadow-lg z-50
        lg:text-lg
      "
    >
      <Tooltip
        text={
          <div
            className="
              text-sm
              lg:text-base
            "
          >
            <h6
              className="
                mb-3 text-center text-base font-bold
                lg:text-lg
              "
            >
              طريقة التصويت
            </h6>
            <p className="leading-[1.8]">
              صوت بـ<span className="font-bold text-[#1e8893]">10</span> للكلمة
              الصحيحة الغير مكررة
            </p>
            <p className="leading-[1.8]">
              صوت بـ<span className="font-bold text-[#1e8893]">5</span> للكلمة
              الصحيحة المكررة
            </p>
            <p className="leading-[1.8]">
              صوت بـ<span className="font-bold text-[#1e8893]">0</span> للكلمة
              الغير صحيحة
            </p>
          </div>
        }
      >
        <p
          className="
            flex h-6 w-6 flex-col items-center justify-center rounded-full
            bg-word-secondary/70 p-2 text-sm font-bold text-word-game
            lg:h-5 lg:w-5 lg:text-lg
          "
        >
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
