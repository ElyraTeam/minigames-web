"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createRoom } from "@/api/rooms";
import useLocalStore from "@/state/local";
import Button3D from "@/components/ui/button-3d";
import {
  CHARS_ARABIC,
  DEFAULT_CHARS_NUMBER,
  DEFAULT_ROOM_OPTIONS,
} from "@/config/word";
import { randomN } from "@/lib/utils";

interface WordCreateGameProps {}

const WordCreateGame: React.FC<WordCreateGameProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nickname = useLocalStore((state) => state.nickname);

  const createGame = async () => {
    if (!nickname) {
      return toast.error("اكتب اسمك يا شطور");
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
        toast.error("Room ID not found.");
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
    <Button3D onClick={createGame} loading={loading} loadingText={"جاري البدأ"}>
      ابدأ اللعبة
    </Button3D>
  );
};

export default WordCreateGame;
