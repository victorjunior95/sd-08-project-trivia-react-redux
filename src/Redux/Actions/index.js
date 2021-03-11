import types from './types';

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
  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((res) => res.json());
  dispatch(saveQuestions(questions.results));
};

export const setNewUserState = (newUserState) => ({
  type: types.NEW_USER_STATE,
  newUserState,
});
