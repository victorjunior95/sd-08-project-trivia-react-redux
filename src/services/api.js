export default async function getToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const requestReturn = await fetch(url);
  const requestObject = await requestReturn.json();
  return requestObject;
}
