import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.updateFetchSituation = this.updateFetchSituation.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      currentQuestion: 0,
      fetchCompleted: 0,
    };
  }

  async componentDidMount() {
    const { numberOfQuestions, token, getQuestions } = this.props;
    await getQuestions(numberOfQuestions, token);
    this.updateFetchSituation();
  }

  updateFetchSituation() {
    this.setState({ fetchCompleted: 1 });
  }

  nextQuestion() {
    const { currentQuestion } = this.state;
    const { numberOfQuestions } = this.props;
    if (currentQuestion < numberOfQuestions - 1) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      console.log('ACABARAM AS QUESTOES');
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, fetchCompleted } = this.state;
    return (
      <div>
        <Header />
        {fetchCompleted
          && <Question
            question={ questions[currentQuestion] }
            nextQuestion={ this.nextQuestion }
          />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfQuestions: state.login.numberOfQuestions,
  token: state.login.token,
  questions: state.login.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (numberOfQuestions, token) => (
    dispatch(fetchQuestions(numberOfQuestions, token))
  ),
});

Game.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
