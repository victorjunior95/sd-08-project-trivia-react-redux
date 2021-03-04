const baseAPI = 'https://opentdb.com';
const getToken = async () => {
  try {
    const endpoint = `${baseAPI}/api_token.php?command=request`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
const getQuestions = async () => {
  try {
    const token = await getToken();
    const endpoint = `${baseAPI}/api.php?amount=5&token=${token}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    data.results.token = token;
    console.table(data.results);
    // console.log(typeof data.results); objeto
    return data.results;
  } catch (error) {
    throw new Error(`${error}`);
  }
};


export default getQuestions;
