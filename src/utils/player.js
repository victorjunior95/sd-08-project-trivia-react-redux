export const getPlayer = () => JSON.parse(localStorage.getItem('state'));

export const setNewScore = (addScore) => {
  const player = getPlayer();

  if (!player) return;

  const newPlayer = {
    ...player.player,
    score: player.player.score + addScore,
    assertions: player.player.assertions + 1,
  };

  localStorage.setItem('state', { player: newPlayer });
};
