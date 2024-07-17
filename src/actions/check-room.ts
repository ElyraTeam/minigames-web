import { API_HOST } from '@/config/constants';

const checkRoomId = async (roomId: string) => {
  try {
    const res = await fetch(`${API_HOST}/word/room/check/${roomId}`);
    return res.status == 200;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export default checkRoomId;