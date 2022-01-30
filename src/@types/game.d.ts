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

interface GameSync {
  id?: string;
  owner?: string;
  state?: State;
  currentRound?: number;
  currentLetter?: string;
  stopClicker?: string;
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

interface CategoryVoteData {
  category: string;
  values: Map<string, string>;
  votes: Map<string, number>;
}

interface ChatMessage {
  type: "system" | "player";
  sender: string;
  message: string;
}
