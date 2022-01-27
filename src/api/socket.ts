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

  sync() // onOptionsSync: (sync: GameOptionsSync) => void, // onGameSync: (sync: GameSync) => void,
  // onPlayersSync: (sync: GamePlayersSync) => void
  {
    this.socket.on('sync', (sync: GameSync) => store.dispatch(setGame(sync)));
    this.socket.on('options', (options: GameOptionsSync) =>
      store.dispatch(setRoom(options))
    );
    this.socket.on('players', (players: GamePlayersSync) =>
      store.dispatch(setPlayers(players))
    );
  }

  authenticate(authReqOptions: AuthenticateRequest) {
    this.socket.emit('authenticate', authReqOptions, (result: any) => {
      console.log(result);
    });
  }
}

const localPlayer = new LocalPlayer();

export default localPlayer;
