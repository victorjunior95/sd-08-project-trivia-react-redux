import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(){
    super()
  //   this.state = {
  //     player: {
  //         name:"",
  //         assertions:"",
  //         score:"",
  //         gravatarEmail:"",
  //     }
  // }
  }


  // savePlayer(){
  //   const {name, email} = this.props

  //   this.setState({
  //       name:name,
  //       gravatarEmail:email,
  //       assertions:0,
  //       score:0,

  //   })
  //     localStorage.setItem('player', JSON.stringify(this.state));
    
  //   console.log(name)
  // }
  render() {
  

import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const certo = 3;
    const { acertos, score } = this.props;
    const messagem = acertos >= certo ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">{mensagem}</p>
          <p data-testid="feedback-total-question">
            Você acertou:
            {score}
            perguntas.
          </p>
          <p data-testid="feedback-total-score">
            Seu placar foi:
            {acertos}
          </p>
          <p data-testid="feedback-total-score">Seu placar foi: 0.</p>
          <p data-testid="feedback-total-question">Você acertou: 0 perguntas.</p>

          <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-text">Podia ser melhor ....</p>

          <Link to ="/ranking">
          <button> Ver o Ranking </button>
          </Link>

        </main>
      </>
    );
  }
}



// const mapStateToProps = (state) => ({
//   email: state.login.email,
//   name: state.login.name,
// })

 export default Feedback

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  acertos: state.user.player.assertions,
  score: state.user.player.score,
});

export default connect(mapStateToProps)(Feedback);

