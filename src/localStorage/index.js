const initialStatePlayer = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const saveResultPlayerStorage = (user = initialStatePlayer) => {
  const player = { ...user };
  if (JSON.parse(localStorage.getItem('state')) === null) {
    localStorage.setItem('state', JSON.stringify({ player }));
  } else {
    localStorage.setItem('state', JSON.stringify({ player }));
  }
};

const getLocalStoragePlayer = () => {
  if (JSON.parse(localStorage.getItem('state'))) {
    return JSON.parse(localStorage.getItem('state'));
  }
  return initialStatePlayer;
};

const createLocalStoragePlayer = ({ name, email }) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('state');
    const player = { ...initialStatePlayer, name, gravatarEmail: email };
    localStorage.setItem('state', JSON.stringify({ player }));
  }
  return { message: 'LocalStorage is not available' };
};

export {
  saveResultPlayerStorage,
  getLocalStoragePlayer,
  createLocalStoragePlayer,
};
