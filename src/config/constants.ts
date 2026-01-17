export const isDev = process.env.NODE_ENV === 'development';
export const APP_NAME_EN = 'ElyraGames';
export const APP_NAME_AR = 'العاب إليرا';
export const TEAM_NAME_AR = 'إليرا';
export const TEAM_NAME_EN = 'Elyra';
export const API_HOST = isDev
  ? 'http://localhost:5000'
  : `https://elyra-minis-dev.hossamohsen.me`;
export const HOST = `https://elyra.games`;

export const MIN_NICKNAME_LENGTH = 1;
export const MAX_NICKNAME_LENGTH = 10;

export const CREDITS: UserCredit[] = [
  {
    name: 'كريم وائل',
    facebookLink: 'https://www.facebook.com/kareem.wael.75',
    linkedinLink: 'https://www.linkedin.com/in/devkarim',
    githubLink: 'https://github.com/devkarim',
  },
  {
    name: 'حسام محسن',
    facebookLink: 'https://www.facebook.com/profile.php?id=100078325080840',
    linkedinLink: 'https://www.linkedin.com/in/hossammohsen',
    githubLink: 'https://github.com/7osCraft',
  },
  {
    name: 'إياد خالد',
    facebookLink: 'https://facebook.com/Eyad.Zinon77',
    linkedinLink: 'https://www.linkedin.com/in/eyadkhaled',
    githubLink: 'https://github.com/EyadKhaled',
  },
  {
    name: 'محمد وليد',
    facebookLink: 'https://www.facebook.com/profile.php?id=100016840150802',
    linkedinLink: 'https://www.linkedin.com/in/mohamad-darwish-50ba59225',
    githubLink: 'https://github.com/XJustMO',
  },
];
