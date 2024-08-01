interface WordHomeCardProps {
  title: string;
  description: string;
}

const WordHomeCard: React.FC<WordHomeCardProps> = ({ title, description }) => {
  return (
    <div className="z-50 max-w-80 space-y-4 lg:space-y-6">
      <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
        {title}
      </h5>
      <div className="text-sm lg:text-lg border-2 px-4 py-6 lg:px-6 lg:py-8 border-word-game rounded-3xl bg-word-home">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WordHomeCard;
