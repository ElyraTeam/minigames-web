import { HOST } from './../config/constants';
import axios from 'axios';

const client = axios.create({
  baseURL: HOST,
  responseType: 'json',
});

export const createRoom = async (
  nickname: string,
  roomOptions: RoomOptions
) => {
  const res = await client.post('/word/room/create', {
    json: { nickname, options: roomOptions },
  });
  return res.data as CreateRoomResponse;
};

export const joinRoom = async (nickname: string, roomId: string) => {
  const res = await client.post(`/word/room/join/${roomId}`, {
    json: { nickname },
  });
  console.log(res);
  return res.data as JoinRoomResponse;
};
