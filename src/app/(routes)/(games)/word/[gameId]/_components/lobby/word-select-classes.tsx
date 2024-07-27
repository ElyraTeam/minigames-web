import WordClass from './word-class';

interface WordSelectClassesProps {
  classes: string[];
  onDelete: (className: string) => void;
}

const WordSelectClasses: React.FC<WordSelectClassesProps> = ({
  classes,
  onDelete,
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-5 lg:px-4">
      {classes.map((className) => (
        <WordClass
          key={`word-class-${className}`}
          name={className}
          onDelete={() => onDelete(className)}
        />
      ))}
    </div>
  );
};

export default WordSelectClasses;
