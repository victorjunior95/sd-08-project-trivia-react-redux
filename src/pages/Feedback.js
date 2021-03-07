import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.feedback = this.feedback.bind(this);
    this.countCorrect = this.countCorrect.bind(this);
  }

  feedback() {
    const { countCorrect } = this.props;
    let phrase = '';
    const goodMedia = 3;
    if (countCorrect < goodMedia) {
      phrase = 'Podia ser melhor...';
    } else {
      phrase = 'Mandou bem!';
    }
    return (<h2 data-testid="feedback-text">{phrase}</h2>);
  }

  countCorrect() {
    const { countCorrect } = this.props;
    const score = localStorage.getItem('state');
    return (
      <div>
        <h3 data-testid="feedback-total-question">
          Número de questões acertadas:
          {countCorrect}
        </h3>
        <h3 data-testid="feedback-total-score">
          Score Total:
          {score}
        </h3>
      </div>);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        {this.feedback()}
        {this.countCorrect()}
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countCorrect: state.login.countCorrect,
});

Feedback.propTypes = {
  countCorrect: PropTypes.number.isRequired,
  history: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Feedback);
