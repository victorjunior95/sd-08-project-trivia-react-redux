export const userLogin = (email, password) => ({
    type: 'USER_EMAIL',
    payload: {
      usermail: email,
      userPassword: password
    },
  });