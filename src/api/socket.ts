import { HOST } from './../config/constants';
import io, { Socket } from 'socket.io-client';
import { store } from '../state/store';
import { setGame } from '../state/reducers/game';
import { setPlayers } from '../state/reducers/players';
import { setRoom } from '../state/reducers/room';

class LocalPlayer {
  socket: Socket;

  constructor() {
    this.socket = io(HOST);
    this.sync();
  }

  sync() {
    // onPlayersSync: (sync: GamePlayersSync) => void // onOptionsSync: (sync: GameOptionsSync) => void, // onGameSync: (sync: GameSync) => void,
    this.socket.on('sync', (sync: GameSync) => store.dispatch(setGame(sync)));
    this.socket.on('options', (options: GameOptionsSync) =>
      store.dispatch(setRoom(options))
    );
    this.socket.on('players', (players: GamePlayersSync) =>
      store.dispatch(setPlayers(players))
    );
  }

  authenticate(
    authReqOptions: AuthenticateRequest,
    ack: (res: string) => void
  ) {
    this.socket.emit('authenticate', authReqOptions, (result: any) => {
      ack(result);
    });
  }

  chat(msg: string) {
    this.socket.emit('chat', msg);
  }

  startRound() {
    this.socket.emit('start-game');
  }

  finishRound() {
    this.socket.emit('stop-game');
  }

  sendVotes(voteData: Map<string, number>) {
    this.socket.emit('vote', voteData);
  }

  onStartTimer(ack: (countdown: number) => void) {
    this.socket.on('start-timer', ack);
  }

  onKick(ack: (kickMsg: string) => void) {
    this.socket.on('kick', ack);
  }

  onChat(ack: (msg: ChatMessage) => void) {
    this.socket.on('chat', ack);
  }

  offAll() {
    this.socket.off('start-timer');
    this.socket.off('kick');
    this.socket.off('chat');
  }
}

const localPlayer = new LocalPlayer();

export default localPlayer;
