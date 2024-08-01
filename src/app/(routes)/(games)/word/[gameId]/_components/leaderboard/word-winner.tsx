import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

import { cn } from '@/lib/utils';

import WordRank from '../word-rank';

interface WordWinnerProps {
  name: string;
  score: number;
  rank: number;
  height: number;
}

const WordWinner: React.FC<WordWinnerProps> = ({
  name,
  score,
  rank,
  height,
}) => {
  const [show, setShow] = useState(false);

  const props = useSpring({
    from: { height: `0%` },
    to: { height: `${height}%` },
    config: {
      mass: 10,
      friction: 70,
      tension: 100,
    },
  });

  // Fix refreshing not animating the leaderboard
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-end w-1/3 gap-3">
      <div className="flex gap-2">
        <WordRank rank={rank} />
        <p className="text-xl">{name}</p>
      </div>
      <animated.div
        className={cn(
          'w-full h-52 bg-yellow-500 flex flex-col items-center pt-4 transition-all min-h-14',
          rank === 1 &&
            'bg-gradient-to-l from-yellow-600 to-white to-[300%] text-white',
          rank === 2 &&
            'bg-gradient-to-l from-gray-500 to-white to-[300%] text-white rounded-bl-2xl',
          rank === 3 &&
            'bg-gradient-to-l from-yellow-800 to-white to-[300%] text-white rounded-br-2xl'
        )}
        style={props}
      >
        <h3 className="font-semibold">{score}</h3>
      </animated.div>
    </div>
  );
};

export default WordWinner;
