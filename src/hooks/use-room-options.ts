import { useState } from 'react';

import useGameStore from '@/state/game';
import useRoomStore from '@/state/room';
import useLocalStore from '@/state/local';
import { changeRoomOptions } from '@/api/rooms';

import useOwner from './use-owner';

const useRoomOptions = () => {
  const nickname = useLocalStore((state) => state.nickname);
  const roomId = useGameStore((state) => state.game?.id);
  const currentOptions = useRoomStore((state) => state.options?.options);
  const updateRoom = useRoomStore((state) => state.updateRoom);
  const [loading, setLoading] = useState(false);
  const isOwner = useOwner();

  const updateRoomOptions = async (newOptions: RoomOptions) => {
    if (!nickname) return 'Nickname not found';
    if (!roomId) return 'Room ID not found';
    if (!isOwner) return 'Player not owner';
    setLoading(true);
    updateRoom(newOptions);
    try {
      await changeRoomOptions(nickname, roomId, newOptions);
    } catch (err) {
      console.error(err);
      setLoading(false);
      return (err as Error).message;
    }
    setLoading(false);
  };

  return { loading, currentOptions, updateRoomOptions };
};

export default useRoomOptions;
