import { useEffect, useRef } from "react";

interface WordBackgroundProps { }

const WordBackground: React.FC<WordBackgroundProps> = ({ children }) => {
  const mainDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (mainDiv.current) mainDiv.current.style.background = "none";
      }
    }
  })

  return (
    <div className="flex justify-center items-center fixed bg-[url('../../public/wordbackground.svg')] bg-cover z-0 top-0 left-0 w-full h-full" ref={mainDiv}>
      {children}
    </div>
  );
};

export default WordBackground;
