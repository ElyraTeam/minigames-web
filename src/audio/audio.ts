import React from "react";

interface AudioCtx {
  ctx?: AudioContext;
  sounds: Map<string, AudioBuffer>;
  play: (sound: string, onEnd?: () => void) => void;
  pause: () => void;
  resume: () => void;
}

let audioCtx: AudioContext | undefined;
let audioMap: Map<string, AudioBuffer> = new Map();

const load = (key: string, url: string) => {
  const req = new XMLHttpRequest();
  req.open("GET", url);
  req.responseType = "arraybuffer";
  req.onload = (e) => {
    audioCtx!.decodeAudioData(
      req.response,
      function (t) {
        audioMap.set(key, t);
      },
      function (t) {
        console.log("Failed loading audio from url '" + e + "'");
      }
    );
  };
  req.send();
};

const loadAudioMap = () => {
  load("tick", "/assets/sounds/ogg/tick.elyraogg");
  load("last-tick", "/assets/sounds/ogg/last-tick.elyraogg");
  load("complete", "/assets/sounds/ogg/complete.elyraogg");
  load("flip", "/assets/sounds/ogg/flip.elyraogg");
  load("victory", "/assets/sounds/ogg/victory.elyraogg");
};

if (typeof window !== "undefined") {
  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  loadAudioMap();
}

export const defaultAudioValue: AudioCtx = {
  ctx: audioCtx,
  sounds: audioMap,
  play: (key, onEnd) => {
    const buffer = audioMap.get(key);

    if (buffer) {
      if (audioCtx!.state === "suspended") {
        audioCtx!.resume();
      }
      const n = audioCtx!.createBufferSource();
      n.buffer = buffer;

      n.onended = () => {
        if (onEnd) onEnd();
        n.disconnect();
      };

      n.connect(audioCtx!.destination);
      n.start(0);
    }
  },
  pause: () => {
    console.log("suspend");
    // audioCtx?.suspend();
  },
  resume: () => {
    console.log("resume");
    // audioCtx?.resume();
  },
};
export const AudioContext = React.createContext<AudioCtx>(defaultAudioValue);
