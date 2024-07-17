type CategoryValues = { [name: string]: string };
type Votes = { [name: string]: number };
type AllPlayersVotes = { [key: string]: { [k: string]: number } };

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
  voted: boolean;
}

interface CategoryVoteData {
  category: string;
  categoryIndex: number;
  values: CategoryValues;
  votes: Votes;
}

interface ChatMessage {
  id: string;
  type: 'system' | 'player';
  sender: string;
  message: string;
  font: 'normal' | 'bold';
}
