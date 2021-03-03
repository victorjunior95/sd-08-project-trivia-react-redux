import getTriviaAPI from '../services/fetchAPI';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

export const requestTriviaAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
  },
});

export const requestTriviaAPISuccess = (data) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
});

export const requestTriviaAPIError = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    isFetching: false,
    error,
  },
});

export const fetchTriviaAPI = (token) => async (dispatch) => {
  dispatch(requestTriviaAPI());
  try {
    const data = await getTriviaAPI(token);
    dispatch(requestTriviaAPISuccess(data));
  } catch (error) {
    dispatch(requestTriviaAPIError(error));
  }
};

export default fetchTriviaAPI;
