
const InitialState = {
    score:[],
    assertions:[]
}



const Score = (state = InitialState, action) => {
    switch (action.type) {
    case 'USER_SCORE':
      return {
        ...state,
        score: [...state.score, action.payload.userScore],
        assertions:[...state.assertions, action.payload.userAssertion]
     
      };
    default:
      return state;
    }
  };
  

  export default Score