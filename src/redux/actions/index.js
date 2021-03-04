export const actionUser = (name, email) => ({ type: 'USER', payload: { name, email } });
export const actionToken = (token) => ({ type: 'TOKEN', payload: { token } });
export const saveQuizAction = () => ({});

const getQuiz = (quiz) => ({ type: 'GET_QUIZ', payload: { quiz } });

const requestQuiz = () => ({ type: 'REQUEST_QUIZ' });

export function fetchQuiz(token) {
  return (dispatch) => {
    dispatch(requestQuiz());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then(({ results }) => {
        dispatch(getQuiz(results));
      });
  };
}
