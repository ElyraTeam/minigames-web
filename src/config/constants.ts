import { DefaultSeoProps } from 'next-seo';
export const IS_TESTING = false;
export const APP_NAME = 'ElyraGames';
export const TEAM_NAME_AR = 'إليرا';
export const TEAM_NAME_EN = 'Elyra';
export const DOMAIN = 'elyra.games';
// export const DOMAIN = "c312-102-191-185-88.ngrok.io";
export const API_HOST = IS_TESTING
  ? 'http://localhost:3000'
  : `https://minigames-backend.onrender.com/`;
export const HOST = `https://elyragames.netlify.app`;

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

export const seoTags: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: HOST,
    site_name: 'ElyraMinis',
    title: 'ElyraMinis | العاب إليرا',
    description: 'Minigames Website by Team Elyra',
    images: [
      {
        url: `${HOST}/logo.png`,
        width: 512,
        height: 512,
        alt: 'Word Logo',
      },
    ],
  },
};
