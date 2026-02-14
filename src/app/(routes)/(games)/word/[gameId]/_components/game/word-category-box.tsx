import Input from '@/components/ui/input';

interface WordCategoryBoxProps {
  label: string;
  letter: string;
  value: string;
  onChange?: (value: string) => void;
}

const WordCategoryBox: React.FC<WordCategoryBoxProps> = ({
  label,
  letter,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <label className="font-bold text-base lg:text-lg">{label}</label>
      <Input
        className="placeholder:text-white/60 bg-white/11 outline-none text-green-800 border-[1px] border-white/50 focus:border-word-primary-900 overflow-y-hidden px-4"
        placeholder={`${letter}ـ..`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default WordCategoryBox;
