interface WordGeneralOptionProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const WordGeneralOption: React.FC<WordGeneralOptionProps> = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h5 className="font-semibold">{title}</h5>
          <p className="text-sm text-white/65">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WordGeneralOption;
