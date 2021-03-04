export const Types = {
  SAVE_USER: 'SAVE_USER',
};

const user = (state = {}, action) => {
  switch (action.type) {
  case Types.SAVE_USER: {
    return { ...state, ...action.payload };
  }
  default: return state;
  }
};

export const Creators = {
  saveUser: (userData) => ({
    type: Types.SAVE_USER,
    payload: userData,
  }),
};

export default user;
