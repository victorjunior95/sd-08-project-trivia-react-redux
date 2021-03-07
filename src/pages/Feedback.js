import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.renderSuccess = this.renderSuccess.bind(this);
    this.renderSad = this.renderSad.bind(this);
    this.renderConditional = this.renderConditional.bind(this);
  }

  renderSuccess() {
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  renderSad() {
    return (
      <h1 data-testid="feedback-text">Podia ser melhor...</h1>
    );
  }

  renderConditional() {
    const { score } = this.props;
    const number = 3;
    if (score >= number) {
      this.renderSuccess();
    }
    return this.renderSad();
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderConditional() }
        <h1 data-testid="feedback-text">Feedback</h1>
        <Link to="/">
          <button
            type="submit"
            className="button-jogar"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            className="button-jogar"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};
