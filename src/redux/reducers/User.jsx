const INITIALSTATE = {
  email: '',
  userName: '',
  avatar: '',
};

const User = (state = INITIALSTATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.payload.email, userName: action.payload.userName };
  default:
    return state;
  }
};

export default User;
