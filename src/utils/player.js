export const getPlayer = () => JSON.parse(localStorage.getItem('state'));

export const setNewScore = (addScore) => {
  const player = getPlayer();
  console.log(player);
  if (!player) return;

  const newPlayer = {
    ...player.player,
    score: player.player.score + addScore,
    assertions: player.player.assertions + 1,
  };
  console.log(newPlayer);

  localStorage.setItem('state', JSON.stringify({ player: newPlayer }));
};
