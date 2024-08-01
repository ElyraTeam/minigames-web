import Image from 'next/image';

interface ElyraLogoProps {
  size?: number;
  isWhite?: boolean;
  className?: string;
  onClick?: () => void;
}

const ElyraLogo: React.FC<ElyraLogoProps> = ({
  size = 65,
  isWhite = true,
  className,
  onClick,
}) => {
  return (
    <Image
      src={isWhite ? '/svg/elyra-white.svg' : '/img/elyra.png'}
      width={size}
      height={size}
      alt="elyra-logo"
      className={className}
      onClick={onClick}
    />
  );
};

export default ElyraLogo;
