interface ErrorResponse {
  errorCode?: number;
  error?: string;
}

interface RoomOptions {
  rounds: number;
  letters: string[];
  categories: string[];
  maxPlayers: number;
}

interface CreateRoomResponse extends ErrorResponse {
  roomId?: string;
}

interface JoinRoomResponse extends ErrorResponse {
  roomId?: string;
  roomOptions?: RoomOptions;
  authToken?: string;
}

interface AuthenticateRequest {
  roomId: string;
  nickname: string;
  authToken: string;
}

enum State {
  LOBBY,
  VOTING,
  INGAME,
}

interface GameSync {
  id?: string;
  owner?: string;
  state?: State;
  currentRound?: number;
  currentCategory?: number;
}

interface GameOptionsSync {
  id?: string;
  options?: RoomOptions;
}

interface GamePlayersSync {
  id?: string;
  players?: Player[];
}

interface Player {
  nickname: string;
  online: boolean;
  owner: boolean;
  totalScore: number;
  lastRoundScore: number;
}
