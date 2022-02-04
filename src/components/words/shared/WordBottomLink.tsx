import classNames from 'classnames';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface WordBottomLinkProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  right?: boolean;
}

const WordBottomLink: React.FC<WordBottomLinkProps> = ({
  label,
  disabled,
  onClick,
  right,
}) => {
  return (
    <h3
      className={classNames(
        'bottom-link text-white ml-10 text-xl font-bold transition-colors',
        {
          'hover:text-[#1A8B90] cursor-pointer': !disabled,
          'float-right': right,
          'float-left': !right,
        }
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {!disabled && !right && <FaArrowLeft className="inline mr-2" />}
      {label}
      {!disabled && right && <FaArrowRight className="inline ml-2" />}
    </h3>
  );
};

export default WordBottomLink;
