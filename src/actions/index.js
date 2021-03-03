import { SAVE_USER } from '../services/consts';

export const addUser = ({ email, name, hash }) => ({
  type: SAVE_USER,
  email,
  name,
  hash,
});

export const teste = () => ({
  type: 'teste',
});
