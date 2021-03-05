// import getQuestions from '../../services/TrivaAPI';

import getCategoriesFromAPI from '../../services/TriviaAPICategories';

export const SAVE_USER = 'SAVE_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_DIFFICULTY = 'SELECT_DIFFICULTY';
// export const REQUEST_PEOPLE_SUCCESS = 'REQUEST_PEOPLE_SUCCESS';
// export const REQUEST_SPECIES_SUCCESS = 'REQUEST_SPECIES_SUCCESS';
// export const FAVORITE_MOVIE = 'FAVORITE_MOVIE';

export const saveUserData = (user) => ({
  type: SAVE_USER,
  user,
});

const requestStart = () => ({
  type: REQUEST_START,
});

const requestFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const requestCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const saveQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
});

export const selectDifficulty = (difficulty) => ({
  type: SELECT_DIFFICULTY,
  difficulty,
});

// export const fetchQuestions = (token) => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const questions = await getQuestions(token);
//     console.log(token);
//     dispatch(requestQuestionsSuccess(questions));
//   } catch (error) {
//     console.log('teste');
//     dispatch(requestFail(error));
//   }
// };

// const requestPeopleSuccess = (people) => ({
//   type: REQUEST_PEOPLE_SUCCESS,
//   people,
// });

// const requestSpeciesSuccess = (species) => ({
//   type: REQUEST_SPECIES_SUCCESS,
//   species,
// });

export const getCategoriesAPI = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const categories = await getCategoriesFromAPI();

    dispatch(requestCategories(categories));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

// export const fetchPeople = () => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const people = await getGhibliPeopleAPI();

//     dispatch(requestPeopleSuccess(people));
//   } catch (error) {
//     dispatch(requestFail(error));
//   }
// };

// export const fetchSpecies = () => async (dispatch) => {
//   dispatch(requestStart());
//   try {
//     const species = await getGhibliSpeciesAPI();

//     dispatch(requestSpeciesSuccess(species));
//   } catch (error) {
//     dispatch(requestFail(error));
//   }
// };
