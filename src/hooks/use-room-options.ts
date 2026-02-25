import { useState } from "react";

import useGameStore from "@/state/game";
import useRoomStore from "@/state/room";
import useLocalStore from "@/state/local";
import {
  CHARS_ARABIC,
  DEFAULT_CATEGORIES_ARABIC,
  DEFAULT_CATEGORIES_ENGLISH,
} from "@/config/word";

import useOwner from "./use-owner";
import localPlayer from "@/api/socket";

const useRoomOptions = () => {
  const nickname = useLocalStore((state) => state.nickname);
  const roomId = useGameStore((state) => state.game?.id);
  const currentOptions = useRoomStore((state) => state.options?.options);
  const updateRoom = useRoomStore((state) => state.updateRoom);
  const savedGameSettings = useLocalStore((state) => state.savedGameSettings);
  const setSavedGameSettings = useLocalStore((state) => state.setSavedGameSettings);
  const [loading, setLoading] = useState(false);
  const isOwner = useOwner();

  const updateRoomOptions = async (newOptions: RoomOptions) => {
    if (!nickname) return "Nickname not found";
    if (!roomId) return "Room ID not found";
    if (!isOwner) return "Player not owner";
    setLoading(true);
    updateRoom(newOptions);
    try {
      await localPlayer.setOptions(newOptions);
      // Detect letter language from the first letter in the new selection
      const letterLang = CHARS_ARABIC.includes(newOptions.letters?.[0] ?? "")
        ? "ar"
        : "en";
      setSavedGameSettings({
        maxPlayers: newOptions.maxPlayers,
        rounds: newOptions.rounds,
        lettersByLanguage: {
          ...savedGameSettings.lettersByLanguage,
          [letterLang]: newOptions.letters,
        },
        categoriesByLanguage: {
          ...savedGameSettings.categoriesByLanguage,
          [letterLang]: newOptions.categories,
        },
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      return (err as Error).message;
    }
    setLoading(false);
  };

  const loadSavedSettings = async () => {
    if (!currentOptions) return "Current options not found";
    if (!isOwner) return "Player not owner";
    if (!savedGameSettings || Object.keys(savedGameSettings).length === 0) {
      return "No saved settings found";
    }

    // Determine current letter language from active options
    const currentLetterLang = CHARS_ARABIC.includes(
      currentOptions.letters?.[0] ?? ""
    )
      ? "ar"
      : "en";
    const defaultCategories =
      currentLetterLang === "ar"
        ? DEFAULT_CATEGORIES_ARABIC
        : DEFAULT_CATEGORIES_ENGLISH;
    const savedLetters =
      savedGameSettings.lettersByLanguage?.[currentLetterLang];
    const savedCategories =
      savedGameSettings.categoriesByLanguage?.[currentLetterLang] ??
      defaultCategories;

    const newOptions: RoomOptions = {
      ...currentOptions,
      ...(savedGameSettings.maxPlayers && { maxPlayers: savedGameSettings.maxPlayers }),
      ...(savedGameSettings.rounds && { rounds: savedGameSettings.rounds }),
      ...(savedLetters && { letters: savedLetters }),
      categories: savedCategories,
    };

    return updateRoomOptions(newOptions);
  };

  return { loading, currentOptions, updateRoomOptions, loadSavedSettings, savedGameSettings };
};

export default useRoomOptions;
