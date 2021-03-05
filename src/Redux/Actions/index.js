import types from './types';

export const sendLoginInfo = (payload) => (
  {
    type: types.LOGIN_INFO,
    payload,
  }
);

export const saveUserInfos = (userInfos) => ({
  type: types.SAVE_USER_INFOS,
  userInfos,
});

export const saveQuestions = (questions) => ({
  type: types.SAVE_QUESTIONS,
  questions,
});

export const fetchQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  console.log(token);
  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((res) => res.json());
  dispatch(saveQuestions(questions.results));
};
