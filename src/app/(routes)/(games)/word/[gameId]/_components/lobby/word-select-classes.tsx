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
    from: { opacity: 0, transform: 'scale(0.9)', maxWidth: 0, margin: '8px 0' },
    enter: { opacity: 1, transform: 'scale(1)', maxWidth: 250, margin: '8px' },
    leave: { opacity: 0, transform: 'scale(0.9)', maxWidth: 0, margin: '8px 0' },
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className="lg:flex lg:justify-center">
      <div className="flex flex-wrap justify-center">
        {transitions((style, className) => (
          <WordClass
            key={`word-class-${className}`}
            name={className}
            onDelete={() => onDelete(className)}
            style={style}
          />
        ))}
      </div>
    </div>
  );
};

export default WordSelectClasses;
