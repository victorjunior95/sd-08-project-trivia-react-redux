export const LOGIN = 'LOGIN';
export const FETCHQUESTIONS = 'FETCH_QUESTIONS';

export const login = (value) => ({ type: LOGIN, value });

export const fetchQuestion = (questions) => ({ type: FETCHQUESTIONS, questions });
