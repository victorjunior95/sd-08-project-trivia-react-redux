export const SAVE_LOGIN = 'SAVE_LOGIN';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const saveUserLogin = (payload) => ({ type: SAVE_LOGIN, payload });

export const saveQuestions = (payload) => ({ type: SAVE_QUESTIONS, payload });
export const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export function fetchQuestions(token) {
  return async (dispatch) => {
    try {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(url);
      const questions = await response.json();
      const payload = { questions };
      return dispatch(saveQuestions(payload));
    } catch (error) {
      const payload = { error };
      return dispatch(fetchError(payload));
    }
  };
}
