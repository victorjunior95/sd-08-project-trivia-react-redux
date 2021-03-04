export default function newPlayer(player) {
  return {
    type: 'NEW_PLAYER',
    payload: player,
  };
}
