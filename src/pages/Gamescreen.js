import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gettoken from '../Service/getToken';
import { fetGetQuestions } from '../actions/index';

class Gamescreen extends React.Component {
  async componentDidMount() {
    const { getquestions } = this.props;
    const NUMBER_OF_QUESTIONS = 5;
    const userToken = await gettoken();
    localStorage.setItem('token', userToken);
    // Esta função esta vindo pela props que vem do mapDispatchToProps
    getquestions(NUMBER_OF_QUESTIONS, userToken);
  }

  render() {
    return (
      <h1>Tela do jogo</h1>
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