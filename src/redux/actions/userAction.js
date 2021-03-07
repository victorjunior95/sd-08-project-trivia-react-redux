export const SAVE_MAIL = 'SAVE_MAIL';
export const ADD_SCORE = 'ADD_SCORE';

export const user = (email, name, score, assertions) => ({
  type: SAVE_MAIL,
  email,
  name,
  score,
  assertions,
});

const saveStorage = (newScore, newAssertions) => {
  const localScore = JSON.parse(localStorage.getItem('player'));
  const scoreAtt = localScore.score + newScore + 1;
  const assertAtt = localScore.assertions + newAssertions + 1;
  localScore.score = scoreAtt;
  localScore.assertions = assertAtt;
  const objPontos = { score: scoreAtt, assertions: assertAtt };
  localStorage.setItem('player', JSON.stringify(localScore));
  return objPontos;
};

export const addScore = (score, assertions) => {
  const { score: scoreAtt, assertions: assertionsAtt } = saveStorage(score, assertions);
  return {
    type: ADD_SCORE,
    score: scoreAtt,
    assertions: assertionsAtt,
  };
};
