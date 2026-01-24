import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { API_HOST } from "@/config/constants";
import useLocalStore from "@/state/local";

const client = axios.create({
  baseURL: API_HOST,
  responseType: "json",
  validateStatus: (s) => true,
});

// Fetch a new HTTP token from the server
export const fetchHttpToken = async (): Promise<string> => {
  const res = await axios.get(`${API_HOST}/token`, {
    validateStatus: (s) => true,
  });

  if (res.data.errorCode) {
    throw new Error(`Failed to fetch token: errorCode ${res.data.errorCode}`);
  }

  const token = res.data.token;
  useLocalStore.getState().setHttpToken(token);
  return token;
};

// Request interceptor - add Authorization header
client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = useLocalStore.getState().httpToken;

    // If no token exists, fetch one
    if (!token) {
      token = await fetchHttpToken();
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle token expiry (errorCode 1012)
client.interceptors.response.use(
  async (response) => {
    if (response.data?.errorCode === 1012) {
      const newToken = await fetchHttpToken();

      const originalRequest = response.config;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return client.request(originalRequest);
    }

    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export const createRoom = async (nickname: string) => {
  const res = await client.post("/word/room/create", {
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
  return client.post("/feedback", { email, name, message, game: "word" });
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
