// import getAPI from '../services/gravatarAPI';

import {
  USER_EMAIL,
  // FETCH_QUESTIONS,
  // FETCH_GRAVATA,
} from './index';

// não revisado daqui pra baixo
export function actionUserEmail(emailPlayer) {
  return {
    type: USER_EMAIL,
    emailPlayer,
  };
}

// export function actionFetchCurrenciesData() {
//   return async (dispatch) => {
//     const CurrenciesData = await getAPI();
//     // console.log(CurrenciesData);
//     dispatch(currenciesData(CurrenciesData));
//   };
// }
