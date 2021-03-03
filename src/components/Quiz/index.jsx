import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchQuiz as fetchQuizAction } from '../../redux/actions'
import { saveQuizAction } from '../../redux/actions'

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      score: '',
      loading: 'true',
      id: 0,
      redirect: false,
      disabled: true,
    };
  }

  componentDidMount() {
    this.props.fetchQuizThunk(this.props.token)
  }

  handleChange() {
    const { id } = this.state;
    id >= 4
      ? this.setState({
        id: 0,
        redirect: true,
      })
      : this.setState((prevState) => ({
        id: prevState.id + 1
      }))
  }

  render() {
    if(this.props.loading === true) return <div>LOADING</div>
    const { quiz } = this.props
    const { id, redirect, disabled } = this.state
    return (
      <section>
        <h1 data-testid="question-category">
          {quiz[id].category}
        </h1>
        <section>
          <div data-testid="question-text">
            {quiz[id].question}
          </div>
          <span>Respostas</span>
          <div>
            <button data-testid="correct-answer">
            {quiz[id].correct_answer}
            </button>
            <button data-testid={`wrong-answer-`}>
            {quiz[id].incorrect_answers[0]}
            </button>
            <button data-testid={`wrong-answer-`}>
            {quiz[id].incorrect_answers[1]}
            </button>
            <button data-testid={`wrong-answer-`}>
            {quiz[id].incorrect_answers[2]}
            </button>
          </div>
        </section>
        <section>
          {redirect
            ? <Link to="/feedback">
                <button disabled={disabled}>Ver resultado</button>
              </Link>
            : <button 
                type="button"
                onClick={this.handleChange}
              >
                Próxima
              </button>
          }
          <div>Counter</div>
        </section>
      </section>
    );
  }
}

Quiz.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading,
})

const mapDispatchToProps = (dispatch) => ({
  saveQuiz: (quiz) => dispatch(saveQuizAction(quiz)),
  fetchQuizThunk: (token) => dispatch(fetchQuizAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);