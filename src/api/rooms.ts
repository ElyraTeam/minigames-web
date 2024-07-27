import axios from 'axios';

import { API_HOST } from '@/config/constants';

const client = axios.create({
  baseURL: API_HOST,
  responseType: 'json',
  withCredentials: true,
  validateStatus: (s) => true,
});

export const createRoom = async (nickname: string) => {
  const res = await client.post('/word/room/create', {
    nickname,
  });
  return res.data as CreateRoomResponse;
};

export const joinRoom = async (nickname: string, roomId: string) => {
  const res = await client.post(`/word/room/join/${roomId}`, {
    nickname,
  });
  return res.data as JoinRoomResponse;
};

export const leaveRoom = async (roomId: string) => {
  const res = await client.post(`/word/room/leave/${roomId}`, {});
  return res.data;
};

export const kickPlayer = async (roomId: string, toKickId: string) => {
  const res = await client.post(`/word/room/kick/${roomId}`, {
    toKickId,
  });
  return res.data;
};

export const sendFeedback = (email: string, name: string, message: string) => {
  return client.post('/feedback', { email, name, message, game: 'word' });
};

// export const changeRoomOptions = async (
//   nickname: string,
//   roomId: string,
//   newOptions: RoomOptions
// ) => {
//   const res = await client.post(`/word/room/options/${roomId}`, {
//     nickname,
//     options: newOptions,
//   });
//   return res.data;
// };
