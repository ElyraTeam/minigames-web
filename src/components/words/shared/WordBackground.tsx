interface WordBackgroundProps {}

const WordBackground: React.FC<WordBackgroundProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center align-mid bg-[url('../../public/wordbackground.svg')] bg-cover z-0 fixed top-0 left-0 w-full h-full">
      {children}
    </div>
  );
};

export default WordBackground;
