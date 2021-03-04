import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaAPI as fetchTriviaAPIAction } from '../Redux/actions';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      question: [],
    };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  async componentDidMount() {
    const { fetchTriviaAPI } = this.props;
    const token = localStorage.getItem('token');
    await fetchTriviaAPI(token);
    await this.loadingData();
  }

  async loadingData() {
    const { data } = this.props;
    if (data !== undefined) {
      this.setState({
        loading: false,
        question: data,
      });
    }
  }

  renderQuestions() {
    const { question } = this.state;
    console.log(question[0]);
    return (
      <>
        <h3
          data-testid="question-category"
        >
          {question[0].category}
        </h3>
        <span
          data-testid="question-text"
        >
          {question[0].question}
        </span>
        <div>
          <button
            type="button"
            data-testid="correct-answer"
          >
            {question[0].correct_answer}
          </button>
          {question[0].incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          ))}
        </div>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
         <Header />
        {loading ? <p>Loading...</p> : this.renderQuestions()}
      </div>
    );
  }
}

Trivia.propTypes = {
  fetchTriviaAPI: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.fetchAPI.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaAPI: (token) => dispatch(fetchTriviaAPIAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
