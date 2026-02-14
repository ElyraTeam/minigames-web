interface WordHomeCardProps {
  title: string;
  description: string;
}

const WordHomeCard: React.FC<WordHomeCardProps> = ({ title, description }) => {
  return (
    <div className="
      z-50 max-w-80 space-y-4
      lg:space-y-6
    ">
      <h5 className="
        text-center text-xl font-bold
        sm:text-2xl
        lg:text-3xl
      ">
        {title}
      </h5>
      <div className="
        rounded-3xl border-2 border-word-game bg-word-home px-4 py-6 text-sm
        lg:px-6 lg:py-8 lg:text-lg
      ">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WordHomeCard;
