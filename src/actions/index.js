export const SAVED_USER = 'SAVED_USER';
export const SAVED_INPUT = 'SAVED_INPUT';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_TOKEN = 'FAILED_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export const savedUser = (user) => ({
  type: SAVED_USER,
  user,
});

// export const savedInput = (inputData) => ({
//   type: SAVED_INPUT,
//   expenses: inputData,
// });

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveToken = (token) => console.log(token) || ({
  type: GET_TOKEN,
  token,
});

export const failedToken = (error) => ({
  type: FAILED_TOKEN,
  payload: {
    error,
  },
});

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken());
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json())
    .then(
      (json) => dispatch(receiveToken(json)),
    )
    .then((json) => localStorage.setItem('token', json.token)) // Guardando o Token no LocalStorage assim que a API retorna
    .catch((error) => dispatch(failedToken(error)));
};

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const myToken = localStorage.getItem('token');
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${myToken}`;
      const result = await fetch(endpoint).then((response) => response.json());
      dispatch(receiveQuestions(result.results));
    } catch (error) {
      return console.error(`ERROR Fetch Qeustions ${error}`);
    }
  };
}

// export function fetchCurrency() {
//   return (dispatch) => {
//     dispatch(requestCurrency());
//     return currencyAPI.getCurrency()
//       .then(
//         (exchangeRates) => dispatch(receiveCurrencySuccess(exchangeRates)),
//         (error) => dispatch(receiveCurrencyFailure(error)),
//       );
//   };
// }

// export function expensesWithExchangeRates(expensesData) {
//   // console.log(expensesData);
//   return async (dispatch) => {
//     dispatch(requestCurrency());
//     try {
//       const exchangeRates = await currencyAPI.getCurrencyV4();
//       expensesData.exchangeRates = exchangeRates;
//       dispatch(completeExpenses(expensesData));
//     } catch (error) {
//       dispatch(receiveCurrencyFailure(error));
//     }
//   };
// }
