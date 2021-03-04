import { SAVE_USER } from '../services/consts';
import getToken from '../services/getToken';
import getQuestions from '../services/getQuestions';

export const addUser = ({ email, name, hash }) => ({
  type: SAVE_USER,
  email,
  name,
  hash,
});

const requestQuestions = () => ({
  type: 'REQUEST_QUESTION',
});

const receiveQuestions = (objectQuestion) => ({
  type: 'RECEIVE_QUESTION',
  objectQuestion,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    return getToken().then(({ token }) => getQuestions(5, token)
      .then((data) => dispatch(receiveQuestions(data))));
  };
}
