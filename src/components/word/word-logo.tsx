import Image from 'next/image';

interface WordLogoProps {
  size?: number;
  onClick?: () => void;
  className?: string;
}

const WordLogo: React.FC<WordLogoProps> = ({
  size = 85,
  className,
  onClick,
}) => {
  return (
    <Image
      src="/svg/wordlogo.svg"
      width={size}
      height={size}
      alt="word-logo"
      className={className}
      onClick={onClick}
    />
  );
};

export default WordLogo;
