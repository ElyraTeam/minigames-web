import got from "got";
import {
  CreateRoomResponse,
  JoinRoomResponse,
  RoomOptions,
} from "./models/models";
export const host = "https://minigames-backend.herokuapp.com";

const client = got.extend({
  prefixUrl: host,
  responseType: "json",
  throwHttpErrors: false,
});

export const createRoom = async (
  nickname: string,
  roomOptions: RoomOptions
) => {
  const res = await client.post("/room/create", {
    json: { nickname, options: roomOptions },
  });
  return JSON.parse(res.body) as CreateRoomResponse;
};

export const joinRoom = async (nickname: string, roomId: string) => {
  const res = await client.post(`/room/join/${roomId}`, {
    json: { nickname },
  });
  return JSON.parse(res.body) as JoinRoomResponse;
};
