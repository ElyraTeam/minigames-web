import { useTransition } from '@react-spring/web';

import WordClass from './word-class';

interface WordSelectClassesProps {
  classes: string[];
  onDelete: (className: string) => void;
}

const WordSelectClasses: React.FC<WordSelectClassesProps> = ({
  classes,
  onDelete,
}) => {
  const transitions = useTransition(classes, {
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
  });

  return (
    <div className="flex justify-center flex-wrap gap-5 lg:px-4">
      {transitions((style, className) => (
        <WordClass
          key={`word-class-${className}`}
          name={className}
          onDelete={() => onDelete(className)}
          style={style}
        />
      ))}
    </div>
  );
};

export default WordSelectClasses;
