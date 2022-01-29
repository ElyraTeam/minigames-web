import { HOST } from "./../config/constants";
import axios from "axios";

const client = axios.create({
  baseURL: HOST,
  responseType: "json",
  withCredentials: true,
  validateStatus: (s) => true,
});

export const createRoom = async (
  nickname: string,
  roomOptions: RoomOptions
) => {
  const res = await client.post("/word/room/create", {
    nickname,
    options: roomOptions,
  });
  return res.data as CreateRoomResponse;
};

export const joinRoom = async (nickname: string, roomId: string) => {
  const res = await client.post(`/word/room/join/${roomId}`, {
    nickname,
  });
  return res.data as JoinRoomResponse;
};

export const leaveRoom = async (nickname: string, roomId: string) => {
  const res = await client.post(`/word/room/leave/${roomId}`, {
    nickname,
  });
  return res.data;
};

export const kickPlayer = async (
  ownerNickname: string,
  roomId: string,
  toKickNickname: string
) => {
  const res = await client.post(`/word/room/kick/${roomId}`, {
    ownerNickname,
    toKickNickname,
  });
  return res.data;
};

export const changeRoomOptions = async (
  nickname: string,
  roomId: string,
  newOptions: RoomOptions
) => {
  const res = await client.post(`/word/room/options/${roomId}`, {
    nickname,
    options: newOptions,
  });
  return res.data;
};
