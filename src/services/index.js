const requestAPITrivia = async () => {
  const token = localStorage.getItem('token');
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await request.json();
  return json;
};

export default requestAPITrivia;
