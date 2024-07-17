'use client';

import useLocalStore from '@/state/local';

interface UsernameTextProps {}

const UsernameText: React.FC<UsernameTextProps> = ({}) => {
  const nickname = useLocalStore((state) => state.nickname);
  return <span className="text-word-primary">{nickname}</span>;
};

export default UsernameText;
