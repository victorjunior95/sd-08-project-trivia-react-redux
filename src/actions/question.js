// import * as api from '../services/trivia';

export const getQuestions = (payload) => ({ type: 'GET_QUESTIONS', payload });

// export const retrieveQuestions = () => async (dispatch) => {
//   const result = await api.getQuestion();
//   dispatch(questions(result));
// };
