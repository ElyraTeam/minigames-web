import { API_HOST } from './constants';

export const WORD_GAME_NAME = 'Word';

export const WORD_GAME_DESCRIPTION_AR =
  'نسخة الويب للعبة الشهيرة (ولد - بنت - حيوان..)';

export const WORD_SOUNDS_URL = `${API_HOST}/assets/sounds`;

export enum WordSound {
  AFTER_LOSE = 'after_lose.wav',
  AFTER_WIN = 'after_win.wav',
  AFTER_WRITE = 'after_write.wav',
  BETWEEN_VOTES = 'between_votes.wav',
  CHAT = 'chat.wav',
  TIMER_END = 'timer_end.wav',
  TIMER_TICK = 'timer_tick.wav',
}

export const DEFAULT_CATEGORIES_ARABIC = [
  'ولد',
  'بنت',
  'حيوان',
  'جماد',
  'اكلة',
  'نبات',
  'بلد',
];

export const DEFAULT_CATEGORIES_ENGLISH = [
  'Boy name',
  'Girl name',
  'Animal',
  'Country',
  'Food',
  'Plant',
  'Color',
];

export const CHARS_ENGLISH: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

export const CHARS_ARABIC: string[] = [
  'أ',
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ك',
  'ل',
  'م',
  'ن',
  'هـ',
  'و',
  'ى',
];

export const DEFAULT_ROUNDS = 6;
export const DEFAULT_MAX_PLAYERS = 8;
export const DEFAULT_CHARS_NUMBER = 10;

export const DEFAULT_ROOM_OPTIONS: RoomOptions = {
  categories: DEFAULT_CATEGORIES_ARABIC,
  rounds: DEFAULT_ROUNDS,
  maxPlayers: DEFAULT_MAX_PLAYERS,
  letters: CHARS_ARABIC.slice(0, DEFAULT_CHARS_NUMBER),
  isPrivate: false,
};

export const availableVotes = [0, 5, 10] as const;
export type Vote = (typeof availableVotes)[number];
