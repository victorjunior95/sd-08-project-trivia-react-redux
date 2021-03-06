export default function newPlayer(player) {
  return {
    type: 'NEW_PLAYER',
    payload: player,
  };
}

export function setScore(score) {
  return {
    type: 'SET_SCORE',
    payload: score,
  };
}
