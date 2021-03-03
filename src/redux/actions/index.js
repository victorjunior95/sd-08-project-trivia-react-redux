export const actionUser = (name, email) => ({ type: 'USER', payload: { name, email } });
export const actionToken = (token) => ({ type: 'TOKEN', payload: { token } });
export const saveQuizAction = (quiz) => ({ type: 'QUIZ', payload: { quiz } });

export const requestQuiz = () => {
  return {
    type: 'REQUEST_QUIZ',
  };
}

export const getQuiz = (quiz) => {
  return {
    type: 'GET_QUIZ',
    payload: {
      quiz,
    },
  };
}

export function fetchQuiz(token) {
  return (dispatch) => {
    dispatch(requestQuiz());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(getQuiz(json.results))
      })
  }
}