interface WordBackgroundProps { }

const WordBackground: React.FC<WordBackgroundProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center fixed xs:bg-[url('../../public/wordbackground.svg')] xs:bg-cover z-0 top-0 left-0 w-full h-full">
      {children}
    </div>
  );
};

export default WordBackground;
