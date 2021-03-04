import { login } from './login';

export default {
  login,
};

export const MOVE_CAR = 'MOVE_CAR';
export const changeState = (car, side) => ({
  type: 'MOVE_CAR',
  car,
  side,
});
