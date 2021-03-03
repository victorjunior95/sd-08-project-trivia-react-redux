import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';

class GameScreenBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
      position: 0,
    };
  }

  componentDidMount() {
    const { fetchQuest } = this.props;
    const tk = localStorage.getItem('token');
    console.log(tk);
    fetchQuest(tk);
  }

  render() {
    const { position } = this.state;
    const { questions } = this.props;
    // console.log(questions.results);
    return (
      <div>
        { questions.length === 0 ? <div>Loading</div>
          : <div>
            <div
              data-testid="question-category"
            >
              {questions.results[position].category}

            </div>
            <div
              data-testid="question-text"
            >
              {questions.results[position].question}

            </div>
            <form>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {questions.results[position].correct_answer}

              </button>
              <button
                type="button"
                data-testid={ `wrong-answer-${0}` }
              >
                {questions.results[position].incorrect_answers[0]}

              </button>
              <button
                type="button"
                data-testid={ `wrong-answer-${1}` }
              >
                {questions.results[position].incorrect_answers[1]}

              </button>
              <button
                type="button"
                data-testid={ `wrong-answer-${2}` }
              >
                {questions.results[position].incorrect_answers[2]}

              </button>
            </form>
            </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuest: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenBody);
