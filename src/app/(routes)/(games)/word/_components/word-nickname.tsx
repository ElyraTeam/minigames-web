'use client';

import useLocalStore from '@/state/local';

interface WordNicknameProps extends React.ComponentProps<'span'> {}

const WordNickname: React.FC<WordNicknameProps> = ({ ...props }) => {
  const nickname = useLocalStore((state) => state.nickname);

  return <span {...props}>{nickname}</span>;
};

export default WordNickname;
