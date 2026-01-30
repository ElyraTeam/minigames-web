import io, { Socket } from "socket.io-client";

import { API_HOST } from "@/config/constants";
import useLocalStore from "@/state/local";
import { fetchHttpToken } from "./rooms";
class LocalPlayer {
  socket: Socket;

  constructor() {
    const token = useLocalStore.getState().httpToken;
    this.socket = io(API_HOST, {
      transports: ["websocket"],
      autoConnect: false,
      withCredentials: true,
      auth: {
        token: token || undefined,
      },
    });

    // Handle socket connection errors - regenerate token on error code 1012
    this.socket.on("connect_error", async (error: any) => {
      console.log("error", error);
      // Check if the error is due to invalid/expired token (errorCode 1012)
      if (error?.data?.errorCode === 1012 || error?.message?.includes("1012")) {
        console.log("Token expired (1012), fetching new token...");
        try {
          const newToken = await fetchHttpToken();
          this.socket.auth = { token: newToken };
          this.socket.connect();
        } catch (err) {
          console.error("Failed to refresh token:", err);
        }
      }
    });

    // Also handle regular error events
    this.socket.on("error", async (error: any) => {
      if (error?.errorCode === 1012 || error?.data?.errorCode === 1012) {
        console.log("Token expired (1012), fetching new token...");
        try {
          const newToken = await fetchHttpToken();
          this.socket.auth = { token: newToken };
          // Reconnect if not already connected
          if (!this.socket.connected) {
            this.socket.connect();
          }
        } catch (err) {
          console.error("Failed to refresh token:", err);
        }
      }
    });

    // this.sync();
  }

  async getPing() {
    let resolveF: (value: number | PromiseLike<number>) => void;
    let rejectF: (reason?: any) => void;
    const promise = new Promise<number>((resolve, reject) => {
      resolveF = resolve;
      rejectF = reject;
    });

    const start = new Date().getTime();
    this.socket.volatile.emit("ping", () => {
      const diff = new Date().getTime() - start;
      if (resolveF) {
        resolveF(diff);
      }
    });

    return promise;
  }

  authenticate(
    authReqOptions: AuthenticateRequest,
    ack: (res: string) => void,
  ) {
    this.socket.emit("authenticate", authReqOptions, (result: any) => {
      ack(result);
    });
  }

  chat(msg: string) {
    this.socket.emit("chat", msg);
  }

  setOptions(options: RoomOptions) {
    this.socket.emit("options", options);
  }

  startRound() {
    this.socket.emit("start-game");
  }

  finishRound() {
    this.socket.emit("stop-game");
  }

  resetGame() {
    this.socket.emit("reset-game");
  }

  ready() {
    this.socket.emit("ready");
  }

  onRequestValues(
    ack: (callback: (values: { [name: string]: string }) => void) => void,
  ) {
    this.socket.on("request-values", ack);
  }

  onStartVote(ack: (categoryData: CategoryVoteData) => void) {
    this.socket.on("start-vote", ack);
  }

  sendVotes(voteData: Votes) {
    this.socket.emit("vote", voteData);
  }

  confirmVotes() {
    this.socket.emit("confirm-vote");
  }

  onAlert(ack: (msg: string, severity: "success" | "error" | "warning" | "info") => void) {
    this.socket.on("alert", ack);
  }

  onStartTimer(ack: (countdown: number) => void) {
    this.socket.on("start-timer", ack);
  }

  onKick(ack: (kickMsg: string) => void) {
    this.socket.on("kick", ack);
  }

  onChat(ack: (msg: ChatMessageServer) => void) {
    this.socket.on("chat", ack);
  }

  onUpdateVotedCount(ack: (count: number) => void) {
    this.socket.on("update-vote-count", ack);
  }

  onPlayerVotes(ack: (votes: AllPlayersVotes) => void) {
    this.socket.on("player-votes", ack);
  }

  onGameOver(ack: (winners: Player[]) => void) {
    this.socket.on("game-over", ack);
  }

  offAll() {
    this.socket.removeAllListeners("start-timer");
    this.socket.removeAllListeners("kick");
    this.socket.removeAllListeners("chat");
    this.socket.removeAllListeners("alert");
    this.socket.removeAllListeners("update-vote-count");
    this.socket.removeAllListeners("start-vote");
    this.socket.removeAllListeners("request-values");
    this.socket.removeAllListeners("player-votes");
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const localPlayer = new LocalPlayer();

export default localPlayer;
