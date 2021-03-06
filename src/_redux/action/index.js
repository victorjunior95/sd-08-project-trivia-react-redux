export const SAVE_USER = 'SAVE_USER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_SHUFFLED_ARRAY = 'ADD_SHUFFLED_ARRAY';

export const saveUserData = (user) => ({
  type: SAVE_USER,
  user,
});

export const saveQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

export const storeScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const storeShuffledArray = (array) => ({
  type: ADD_SHUFFLED_ARRAY,
  array,
});
