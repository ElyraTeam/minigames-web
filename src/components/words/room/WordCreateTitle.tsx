interface WordCreateTitleProps {
  title: string;
  onClick?: () => void;
}

const WordCreateTitle: React.FC<WordCreateTitleProps> = ({
  title,
  children,
  onClick,
}) => {
  return (
    <div className="flex justify-center">
      <h2 className="mb-5 text-white text-2xl font-semibold">{title}</h2>
      {children && (
        <span
          className="ml-2 bg-[#92E4AB] text-[#6BCF89] p-2 rounded-full cursor-pointer text-sm hover:text-white hover:bg-[#1a8c90] h-fit translate-y-[1.5px]"
          onClick={onClick}
        >
          {children}
        </span>
      )}
    </div>
  );
};

export default WordCreateTitle;
