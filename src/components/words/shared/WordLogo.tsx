import Image from 'next/image';

interface WordLogoProps {
  size?: string;
}

const WordLogo: React.FC<WordLogoProps> = ({ size = 85 }) => {
  return <Image src="/wordlogo.svg" width={size} height={size} alt="logo" />;
};

export default WordLogo;
