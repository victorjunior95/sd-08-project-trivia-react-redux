export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS';
export const urlToken = 'https://opentdb.com/api_token.php?command=request';

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const ADD_CORRECT_ANSWER = 'ADD_CORRECT_ANSWER';

export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_REQUEST_SUCCESS = 'QUESTIONS_REQUEST_SUCCESS';
export const urlQuestions = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;
