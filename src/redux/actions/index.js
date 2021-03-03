export const actionUser = (name, email) => ({ type: 'USER', payload: { name, email } });
export const actionToken = (token) => ({ type: 'TOKEN', payload: { token } });
