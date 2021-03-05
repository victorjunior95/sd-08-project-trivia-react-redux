export const getToken = async () => {
  const token = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((res) => res.json());
  return token.token;
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};
