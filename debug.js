const fetch = require('node-fetch');

const token = '5bf40273e1d807ac3a0cb62b1e1632f8f8761f3332fbfa69f30fd55223f79695';

const aaaa = {
  category: '',
  type: '',
  question: '',
  answers: [
    {
      answer: 'Psychoanalysis',
      isCorrect: true,
    },
    //---------
    {
      answer: 'Psychoanalysis',
      isCorrect: false,
    },
  ],
};

const pegaToken = async () => {
  const token = await fetch(
    'https://opentdb.com/api_token.php?command=request',
  ).then((res) => res.json());
  console.log(token);
};

const pegaPerguntas = async () => {
  const perguntas = await fetch(`https://opentdb.com/api.php?amount=${1}&token=${token}`).then((res) => res.json());
  console.log(perguntas.results);
  return perguntas.results;
};

// pegaPerguntas();

const transformePergunta = async () => {
  const pergunta = await pegaPerguntas();
  const objetoDaPergunta = {
    category: pergunta[0].category,
    type: pergunta[0].type,
    question: pergunta[0].question,
    answers: [{
      answer: pergunta[0].correct_answer,
      isCorrect: true,
    },
    ...pergunta[0].incorrect_answers.map((i) => ({
      answers: i,
      isCorrect: false,
    })),
    ],
  };
  console.log(objetoDaPergunta);
};

transformePergunta();
