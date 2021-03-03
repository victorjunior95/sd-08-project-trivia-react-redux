export default function newPlayer(player) {
  console.log(player);
  return {
    type: 'NEW_PLAYER',
    payload: player,
  };
}
