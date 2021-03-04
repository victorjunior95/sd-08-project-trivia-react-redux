export default async function getUserToken() {
  try {
    const token = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((data) => data.json());
    return token.token;
  } catch (error) {
    throw new Error(error);
  }
}

/*export const fetchGravatar = (value) => async (dispatch) => {
  // console.log(value)
  const requestGravatar = await fetch(`https://www.gravatar.com/avatar/${value}`);
  console.log(requestGravatar); //
  // const gravatarResponse = await request.json();
  // console.log(gravatarResponse);
  dispatch(getGravatar(requestGravatar.url));
};*/