export default async function fetchTriviaQuest() {
  const token = localStorage.getItem('token');
  const questObj = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  return questObj.json();
}
