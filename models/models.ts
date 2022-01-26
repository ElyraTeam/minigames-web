export interface ErrorResponse {
    errorCode?: number;
    error?: string;
}

export interface RoomOptions {
    rounds: number;
    letters: string[];
    categories: string[];
    maxPlayers: number;
}

export interface CreateRoomResponse extends ErrorResponse {
    roomId?: string;
}

export interface JoinRoomResponse extends ErrorResponse {
    roomId?: string;
    roomOptions?: RoomOptions;
    authToken?: string;
}