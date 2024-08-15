import 'server-only';

import { API_HOST } from '@/config/constants';

interface RoomInfoResponse {
  roomId: string;
  owner: string;
}

const checkRoomId = async (
  roomId: string,
  nickname?: string
): Promise<RoomInfoResponse> => {
  const res = await fetch(
    `${API_HOST}/word/room/check/${roomId}?nickname=${nickname?.trim()}`,
    { cache: 'no-cache' }
  );
  return res.json();
};

export default checkRoomId;
