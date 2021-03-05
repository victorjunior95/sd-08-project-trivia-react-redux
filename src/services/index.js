const triviaAPI = () => {
  const API_URL = 'https://opentdb.com/api.php';
  const params = Object.entries({
    amount: 5,
    category: 9,
    difficulty: 'easy',
    type: 'multiple',
  })
    .map(([key, value], i) => `${i === 0 ? '?' : '&'}${key}=${value}`)
    .join('');

  return `${API_URL}${params}`;
};

export default triviaAPI;
