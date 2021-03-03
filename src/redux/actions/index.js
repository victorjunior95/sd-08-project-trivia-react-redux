import md5 from 'crypto-js/md5';

export const LOGIN = 'LOGIN';
const GET_QUESTIONS = 'GET_QUESTIONS';

export const login = (player, token) => ({
  type: LOGIN,
  payload: {
    player,
    token,
  },
});

export const getQuestions =(questions) => ({
  type: GET_QUESTIONS,
  payload: {
    questions,
  }
})

export const game = ()

export function requestToken(name, email) {
  const gravatarEmail = md5(email).toString();
  const player = { name, gravatarEmail };
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) dispatch(requestQuestions(token))

    //   const response = requestQuestions(token);
    //   response.response_code  === 3 
    //   ? await fetch('https://opentdb.com/api_token.php?command=request')
    //  .then((response) => response.json())
    //  .then((data) => dispatch(login(player, data.token)))
    //  : 
    // }


      
  };
}

export const requestNewToken = () => {
    const newToken = await fetch('https://opentdb.com/api_token.php?command=request')
     .then((response) => response.json())
     .then((data) => data.token);
}

export async function requestQuestions(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => data);
  return response.response_code === 0 
  ? getQuestions(response.results)
  : 
  
}


