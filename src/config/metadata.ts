import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'ElyraGames',
  description: 'Play games and have fun!',
  openGraph: {
    title: 'ElyraGames',
    description: 'Play games and have fun!',
    images: [
      {
        url: `/img/elyra.png`,
        width: 81,
        height: 81,
        alt: 'ElyraGames Logo',
      },
    ],
  },
};

export const defaultWordMetadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `/logo.png`,
        width: 512,
        height: 512,
        alt: 'Word Logo',
      },
    ],
  },
};
