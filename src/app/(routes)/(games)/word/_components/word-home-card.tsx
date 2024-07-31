interface WordHomeCardProps {
  title: string;
  description: string;
}

const WordHomeCard: React.FC<WordHomeCardProps> = ({ title, description }) => {
  return (
    <div className="z-50 max-w-80 space-y-6">
      <h5 className="text-3xl font-bold text-center">{title}</h5>
      <div className="text-lg border-2 px-6 py-8 border-word-game rounded-3xl bg-word-home">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WordHomeCard;
