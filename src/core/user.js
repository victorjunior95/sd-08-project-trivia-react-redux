import md5 from 'crypto-js/md5';

const playerFactory = ({ name, email }) => ({
  name,
  assertions: 0,
  score: 0,
  gravatarEmail: email,
});

const login = () => {
  //
};
