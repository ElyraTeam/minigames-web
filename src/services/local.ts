import axios from 'axios';

const client = axios.create({
  baseURL: '/',
  responseType: 'json',
  withCredentials: true,
  validateStatus: (s) => true,
});

export const saveSession = (nickname: string) => {
  return client.post<boolean>('/api/user-info', { nickname });
};
