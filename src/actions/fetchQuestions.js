export const GET_QUESTIONS = 'GET_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const requestQuestions = () => ({
  type: GET_QUESTIONS,
});

const receiveQuestions = (json) => ({
  type: RECEIVE_QUESTIONS,
  payload: json,
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    const token = localStorage.getItem('token');
    const number = 5;
    return fetch(`https://opentdb.com/api.php?amount=${number}&token=${token}`)
      .then((response) => response.json())
      .then((questions) => dispatch(receiveQuestions(questions)));
  };
}
