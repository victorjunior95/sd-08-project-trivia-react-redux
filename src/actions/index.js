export const userLogin = (email, name) => ({
  type: 'USER_EMAIL',
  payload: {
    userEmail: email,
    userName: name,
  },
});

export const token = (value) => ({
  type: 'TOKEN',
  value,
});

export const perguntas = (value) => ({
  type: 'PERGUNTA',
  value,
});

export const fetchJogo = () => async (dispatch) => {
  const endPointToken = 'https://opentdb.com/api_token.php?command=request';
  const respondeApi = await fetch(endPointToken);
  const jsonApi = await respondeApi.json();
  localStorage.setItem('token', JSON.stringify(jsonApi.token));
  return dispatch(token(jsonApi));
};

// export const fetchPerguntas = (tokenUser) => async (dispatch) => {
//   const endPointToken = `https://opentdb.com/api.php?amount=5&token=${tokenUser}`;
//   const respondeApi = await fetch(endPointToken);
//   const jsonApi = await respondeApi.json();
//   return dispatch(perguntas(jsonApi));
// };

export const fetchPerguntas = (value) => async (dispatch) => {
  try {
    dispatch({
      type: 'PERGUNTA',
    });

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${value}`);
    const reponsejson = await response.json();

    dispatch({
      type: 'REQUEST_SUCESS',
      payload: {
        data: reponsejson,

      },
    });
  } catch (e) {
    dispatch({

      type: 'REQUEST_FAIL',
    });
  }
};
