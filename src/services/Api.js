const endPointToken = 'https://opentdb.com/api_token.php?command=request';

export const requestToken = async () => {
  try {
    const request = await fetch(endPointToken);
    const json = await request.json();
    localStorage.setItem('token', JSON.stringify(json.token));
  } catch (error) {
    console.log('Erroou');
  }
};

export const requestTrivia = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await request.json();
    return json.results;
  } catch (error) {
    console.log('Erroou');
  }
};
