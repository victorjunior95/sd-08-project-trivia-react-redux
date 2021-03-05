import React from 'react';
import { connect } from 'react-redux';

class QuestionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      nextQuestion: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.questionPicker();
  }

  questionPicker() {
    const FIVE = 4;
    const questionIndex = Math.floor(Math.random() * FIVE);
    console.log(questionIndex);
    return questionIndex;
  }

  nextQuestion() {
    const { nextQuestion } = this.state;
    this.setState({
      nextQuestion: nextQuestion + 1,
    });
  }

  alternatives() {
    const { questions: { questions } } = this.props;
    const { nextQuestion } = this.state;
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = questions[nextQuestion];
    console.log(correctAnswer, incorrectAnswers);
    return (
      <>
        <button value={ correctAnswer } type="button" data-testid="correct-answer">
          { correctAnswer }
        </button>
        {incorrectAnswers
          .map((incorrectAnswer, index) => (
            <button
              value={ incorrectAnswer }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {incorrectAnswer}
            </button>))}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </>
    );
  }

  render() {
    const { questions: { questions } } = this.props;
    const { nextQuestion } = this.state;
    console.log(questions[nextQuestion]);
    if (questions === '') return <span>Pera que já vem...</span>;
    return (
      <>
        <h1>Question</h1>
        <h2 data-testid="question-category">{ questions[nextQuestion].category }</h2>
        <h3 data-testid="question-text">
          { questions[nextQuestion].question }
        </h3>
        {this.alternatives()}
      </>
    );
  }
}

const mapStateToProps = (questions) => ({
  questions,
});

// export default QuestionScreen;
export default connect(mapStateToProps)(QuestionScreen);
