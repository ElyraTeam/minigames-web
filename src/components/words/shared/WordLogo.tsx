import Image from 'next/image';

interface WordLogoProps {
  size?: string;
  onClick: () => void;
  className?: string;
}

const WordLogo: React.FC<WordLogoProps> = ({
  size = 85,
  className,
  onClick,
}) => {
  return (
    <Image
      src="/wordlogo.svg"
      width={size}
      height={size}
      alt="logo"
      className={className}
      onClick={onClick}
    />
  );
};

export default WordLogo;
