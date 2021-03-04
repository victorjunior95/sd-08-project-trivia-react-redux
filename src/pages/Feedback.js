import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components';

const PASSING_SCORE = 3;

const Feedback = ({ correctAnswers, score }) => {
  const message = correctAnswers >= PASSING_SCORE ? 'Mandou bem!' : 'Podia ser melhor...';

  return (
    <div className="d-flex flex-column">
      <Header />
      <section>
        <h5 data-testid="feedback-text">{ message }</h5>
        <h6 data-testid="feedback-total-score">{ score }</h6>
        <h6 data-testid="feedback-total-question">{ correctAnswers }</h6>
      </section>
      <Link
        to="/"
        data-testid="btn-play-again"
        className="ranking btn btn-secondary w-25"
      >
        <h7>Jogar Novamente</h7>
      </Link>
      <Link
        to="/ranking"
        data-testid="btn-ranking"
        className="ranking btn btn-secondary w-25"
      >
        <h7>Ranking</h7>
      </Link>
    </div>
  );
};

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswers: state.play.correctAnswers,
  score: state.play.score,
});

export default connect(mapStateToProps)(Feedback);
