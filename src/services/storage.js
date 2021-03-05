const INITIAL_PLAYER = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const INITAL_TOKEN = '';

const INITIAL_RANKING = [];

export const init = () => {
  console.log('init');
  localStorage.setItem('state', JSON.stringify(INITIAL_PLAYER));
  localStorage.setItem('token', INITAL_TOKEN);
  localStorage.setItem('ranking', JSON.stringify(INITIAL_RANKING));
};

export const saveToken = (token) => {
  console.log('saving token', token);
  localStorage.setItem('token', token);
};
