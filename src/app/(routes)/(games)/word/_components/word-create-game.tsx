'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { createRoom } from '@/api/rooms';
import useLocalStore from '@/state/local';
import Button3D from '@/components/ui/button-3d';

interface WordCreateGameProps {}

const WordCreateGame: React.FC<WordCreateGameProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nickname = useLocalStore((state) => state.nickname);

  const createGame = async () => {
    if (!nickname) {
      return toast.error('اكتب اسمك يا شطور');
    }
    setLoading(true);
    try {
      const res = await createRoom(nickname);
      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }
      if (!res.roomId) {
        toast.error('Room ID not found.');
        setLoading(false);
        return;
      }
      router.push(`/word/${res.roomId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Button3D
      className="self-center bg-word-game-950 rounded-2xl disabled:bg-word-game-950"
      frontClassName={
        'from-word-game-800 to-word-game-900 to-[200%] text-base rounded-2xl -translate-y-[8px] group-active:-translate-y-[3px] group-disabled:-translate-y-[5px] h-[50px] py-2 group-disabled:from-word-game-800 group-disabled:to-word-game-900 group-disabled:to-[800%] px-4 content-center'
      }
      onClick={createGame}
      loading={loading}
    >
      أنشئ غرفة
    </Button3D>
  );
};

export default WordCreateGame;
