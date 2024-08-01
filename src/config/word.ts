import { API_HOST } from './constants';

export const WORD_GAME_NAME = 'Word';
export const WORD_GAME_NAME_AR = 'كلمة';

export const WORD_GAME_DESCRIPTION_AR =
  'نسخة الويب للعبة الشهيرة (واد - بنت - حيوان..)';

export const WORD_SOUNDS_URL = `${API_HOST}/assets/sounds`;

export const DEFAULT_CATEGORIES_ARABIC = [
  'ولد',
  'بنت',
  'حيوان',
  'جماد',
  'اكلة',
  'نبات',
  'بلد',
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
