export const SAVE_MAIL = 'SAVE_MAIL';

export const user = (email, name) => ({
  type: SAVE_MAIL,
  email,
  name,
});
