import api, { https } from '../../services/apiGamer';
import localStorageToken from '../../services/validatorLocalStorage';

export const INITIALIZE_GAME = 'INICIALIZE_GAME';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';

const startTheGame = (payload) => ({
  type: INITIALIZE_GAME,
  payload,
});

export function getStartTheGame({ nickname, email }) {
  return async (dispatch) => {
    const { token } = await api(https.token);
    localStorageToken('token', token)
      .then((response) => dispatch(startTheGame({
        email,
        nickname,
        ...response,
      })));
  };
}

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export function fetchQuestions(numberOfQuestions, token) {
  return async (dispatch) => {
    const questions = await api(https.questions(numberOfQuestions, token));
    const arrayQuestions = Object.values(questions.results);
    dispatch(getQuestions(arrayQuestions));
  };
}

export function updateGameSituation() {
  return {
    type: UPDATE_GAME_STATUS,
  };
}
