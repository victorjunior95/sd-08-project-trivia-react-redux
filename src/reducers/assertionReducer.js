const InitialState = {
  assertion: 0,
};

const Assertion = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_ASSERTION':
    return {
      ...state,
      assertion: state.assertion + action.payload.userAssertion,

    };
  default:
    return state;
  }
};

export default Assertion;
