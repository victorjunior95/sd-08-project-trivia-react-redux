const trivia = require('./trivia');

// localStorage.setItem('state', JSON.stringify(
//   { player: { name, assertions: 0, score: 0, gravatarEmail: email } },
// ));

// const loadStore = () => {
//   //
// };

const login = async ({ name, email }) => {
  await trivia.retriveApiToken();
  localStorage.setItem('state', JSON.stringify(
    { player: { name, assertions: 0, score: 0, gravatarEmail: email } },
  ));
};

const logout = async () => {
  localstorage.remove('state');
};

module.exports = {
  login,
  logout,
};
