export default async function getUserToken() {
  try {
    const token = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((data) => data.json());
    return token.token;
  } catch (error) {
    throw new Error(error);
  }
}
