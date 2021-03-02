export const userLogin = (email, password) => ({
    type: 'USER_EMAIL',
    payload: {
      userEmail: email,
      userPassword: password
    },
  });