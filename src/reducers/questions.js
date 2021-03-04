// Esse reducer será responsável por tratar todas as informações relacionadas as despesas
import INITIAL_STATE from './initialState';
import {
  FETCH_QUESTIONS,
  UPLOAD_SCORE,
} from '../actions';


// mecher a partir daqui 
export default function questions(state = INITIAL_STATE, action) {
  // const { expenses, total } = state;

  switch (action.type) {
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case UPLOAD_SCORE:
    return {
      ...state,
      scorePlayer: action.scorePlayer,
    };
  default:
    return state;
  }
}
