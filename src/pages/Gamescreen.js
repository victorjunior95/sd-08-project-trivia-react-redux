import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gettoken from '../Service/getToken';
import { fetGetQuestions } from '../actions/index';
import QuestionScreen from '../components/QuestionScreen';

class Gamescreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };

    this.getGameStuff = this.getGameStuff.bind(this);
  }

  async componentDidMount() {
    // const { getquestions } = this.props;
    const NUMBER_OF_QUESTIONS = 5;
    const userToken = await gettoken();
    localStorage.setItem('token', userToken);
    // Esta função esta vindo pela props que vem do mapDispatchToProps
    this.getGameStuff(NUMBER_OF_QUESTIONS);
  }

  async getGameStuff(quantity) {
    const { getquestions } = this.props;
    const userToken = localStorage.getItem('token');
    const questions = await getquestions(quantity, userToken);
    this.setState({
      questions,
    });
  }

  render() {
    const { questions } = this.state;
    console.log('question', questions);
    return (
      <QuestionScreen questions={ questions } />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getquestions: (NUMBER_OF_QUESTIONS, userToken) => dispatch(
    fetGetQuestions(NUMBER_OF_QUESTIONS, userToken),
  ),
});

Gamescreen.propTypes = {
  getquestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Gamescreen);
