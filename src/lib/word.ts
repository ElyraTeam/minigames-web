export const getPlayerById = (players: Player[], id: string) => {
  return players.find((plr) => plr.id === id);
};
