import { FaArrowLeft } from 'react-icons/fa';

interface WordBottomLinkProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const WordBottomLink: React.FC<WordBottomLinkProps> = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <h3
      className={
        'bottom-link text-white ml-10 text-xl float-left font-semibold ' +
        (!disabled ? 'hover:text-[#1A8B90] cursor-pointer' : '')
      }
      onClick={!disabled ? onClick : undefined}
    >
      {!disabled && <FaArrowLeft className="inline mr-2" />}
      {label}
    </h3>
  );
};

export default WordBottomLink;
