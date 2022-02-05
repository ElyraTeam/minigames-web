import classNames from 'classnames';

interface WordContentProps {
  className?: string;
}

const WordContent: React.FC<WordContentProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        'content-box bg-dark relative rounded-2xl mb-5 mt-3 mx-5 h-[384px] lg:items-center lg:pb-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export default WordContent;
