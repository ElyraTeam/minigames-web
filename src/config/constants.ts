export const IS_TESTING = false;
export const APP_NAME = 'BianMinis';
export const TEAM_NAME = 'بيان';
export const DOMAIN = 'minigames-backend.herokuapp.com';
export const HOST = IS_TESTING ? 'http://localhost:3000' : `https://${DOMAIN}`;
export const HOST_TEMP = `https://bian-games.netlify.app`;

export const CREDITS: UserCredit[] = [
  { name: 'كريم وائل', facebookLink: 'f', twitterLink: 'f', githubLink: 'f' },
  { name: 'حسام محسن', facebookLink: 'f', twitterLink: 'f', githubLink: 'f' },
  { name: 'إياد خالد', facebookLink: 'f', twitterLink: 'f', githubLink: 'f' },
  { name: 'محمد وليد', facebookLink: 'f', twitterLink: 'f', githubLink: 'f' },
];
