type CategoryValues = { [name: string]: string };
type Votes = { [name: string]: Vote };
type AllPlayersVotes = { [playerId: string]: { [voteTo: string]: Vote } };

interface ErrorResponse {
  errorCode?: number;
  error?: string;
}

interface RoomOptions {
  rounds: number;
  letters: string[];
  categories: string[];
  maxPlayers: number;
  isPrivate: boolean;
}

interface CreateRoomResponse extends ErrorResponse {
  roomId?: string;
}

interface JoinRoomResponse extends ErrorResponse {
  roomId: string;
  roomOptions: RoomOptions;
  authToken: string;
  playerId: string;
}

interface AuthenticateRequest {
  game: 'word';
  roomId: string;
  nickname: string;
  authToken: string;
}

interface GameSync {
  id?: string;
  state?: State;
  ownerId?: string;
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
  id: string;
  sessionId: string;
  nickname: string;
  online: boolean;
  owner: boolean;
  totalScore: number;
  lastRoundScore: number;
  voted: boolean;
  ready: boolean;
}

interface CategoryVoteData {
  category: string;
  categoryIndex: number;
  values: CategoryValues;
  votes: AllPlayersVotes;
}

interface ChatMessagePart {
  id: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string; //Hex
}

interface ChatMessagePartServer extends Omit<ChatMessagePart, 'id'> {}

interface ChatMessage {
  id: string;
  type: 'system' | 'player';
  sender: string;
  parts: ChatMessagePart[];
}

interface ChatMessageServer extends ChatMessage {
  parts: ChatMessagePartServer[];
}
