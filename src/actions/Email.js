import getAPI from '../services/requestAPI';

import {
  USER_EMAIL,
  FETCH_QUESTIONS,
  FETCH_GRAVATA,
} from './index';


// não revisado daqui pra baixo
export function actionUserEmail(email) {
  return {
    type: USER_EMAIL,
    email,
  };
}

export function currencies(answer) {
  return {
    type: FETCH_CURRENCIES,
    currencies: answer,
  };
}
function currenciesArray(answer) {
  return (dispatch) => {
    const currenciesKeys = Object.keys(answer);
    const filterCurrencies = currenciesKeys.filter((
      currencyKey,
    ) => currencyKey !== 'USDT');
    dispatch(currencies(filterCurrencies));
  };
}

export function currenciesData(answer) {
  return {
    type: FETCH_CURRENCIES_DATA,
    currenciesData: answer,
  };
}
export function actionFetchCurrenciesData() {
  return async (dispatch) => {
    const CurrenciesData = await getAPI();
    // console.log(CurrenciesData);
    dispatch(currenciesData(CurrenciesData));
    dispatch(currenciesArray(CurrenciesData));
  };
}

export function actionAddExpenses(expense) {
  return {
    type: ADD_EXPENSES,
    expense,
  };
}

export function actionDeleteExpenses(expense) {
  return {
    type: DELETE_EXPENSES,
    expense,
  };
}
