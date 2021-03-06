export const RESTART_TIME = 'RESTART_TIME';

export const timer = (callback) => ({ type: RESTART_TIME, resetTimer: callback });
