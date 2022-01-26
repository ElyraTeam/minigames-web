import { RoomOptions } from "./models";

export enum State {
  LOBBY,
  VOTING,
  INGAME,
}

export interface GameSync {
  id: string;
  owner: string;
  state: State;
  currentRound: number;
  currentCategory: number;
}

export interface GameOptionsSync {
  id: string;
  options: RoomOptions;
}

export interface GamePlayersSync {
  id: string;
  players: Player[];
}

export interface Player {
  nickname: string;
  online: boolean;
  owner: boolean;
  totalScore: number;
  lastRoundScore: number;
}
