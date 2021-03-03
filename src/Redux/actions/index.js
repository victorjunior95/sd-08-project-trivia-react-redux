export const playerEmailAction = (value) => ({
  type: 'USER_EMAIL',
  value,
});

export const playerNomeAction = (value) => ({
  type: 'USER_NOME',
  value,
});

export const apiRequestToken = () => ({
  type: 'REQUEST_TOKEN',
});

export const apiRequestTokenSuccess = (value) => ({
  type: 'REQUEST_TOKEN_SUCCESS',
  value,
});

export const apiRequestQuestionSent = (value) => ({
  type: 'REQUEST_QUESTION_SENT',
  value,
});

export const apiRequestQuestionSucess = (json) => ({
  type: 'REQUEST_QUESTION_SUCESS',
  value: {
    json,
  },
});

export const apiRequestFetch = () => async (dispatch) => {
  dispatch(apiRequestToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(apiRequestToken(data.token));
    localStorage.setItem('token', data.token);
  } catch (error) {
    return console.log(error);
  }
};

export const apiGetQuestion = () => async (dispatch) => {
  dispatch(apiGetQuestion());
  try {
    const getToken = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const data = await response.json();
    const questionReceived = data.results;
    dispatch(apiGetQuestion(questionReceived));
  } catch (error) {
    return console.log(error);
  }
};
