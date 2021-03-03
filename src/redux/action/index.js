import requestAPITrivia from '../../services';

export const REQUEST_API_TRIVIA = 'REQUEST_API_TRIVIA';
export const REQUEST_ERROR = 'REQUEST_ERROR';

const requestSuccess = (questions) => ({
  type: REQUEST_API_TRIVIA,
  payload: questions,
});

const requestFail = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const thunk = () => async (dispatch) => {
  try {
    const request = await requestAPITrivia();
    dispatch(requestSuccess(request.results));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
