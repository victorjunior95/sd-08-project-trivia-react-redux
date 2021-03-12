export const getPlayer = () => JSON.parse(localStorage.getItem('state')) || {};

export const setNewScore = (addScore) => {
  const player = getPlayer();

  if (!player.name) return;

  const newPlayer = {
    ...player.player,
    score: player.player.score + addScore,
    assertions: player.player.assertions + 1,
  };

  localStorage.setItem('state', JSON.stringify({ player: newPlayer }));
};
