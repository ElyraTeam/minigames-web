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
      <label className="
        text-base font-bold
        lg:text-lg
      ">{label}</label>
      <Input
        className="
          overflow-y-hidden border border-white/50 bg-white/11 px-4
          text-green-800 outline-none
          placeholder:text-white/60
          focus:border-word-primary-900
        "
        placeholder={`${letter}ـ..`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default WordCategoryBox;
