import 'server-only';

import { API_HOST } from '@/config/constants';

const checkRoomId = async (roomId: string, nickname?: string) => {
  try {
    const res = await fetch(
      `${API_HOST}/word/room/check/${roomId}?nickname=${nickname?.trim()}`
    );
    return {
      success: res.status == 200,
      errorCode: res.status !== 200 ? res.status : null,
    };
  } catch (err) {
    console.error(err);
  }
  return { success: false };
};

export default checkRoomId;
