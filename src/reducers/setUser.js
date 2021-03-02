const initialState = {
  name: '',
  email: '',
};

const setUser = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_USER':
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    });
  default:
    return state;
  }
};

export default setUser;
