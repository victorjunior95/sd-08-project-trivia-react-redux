import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';

const PASSING_SCORE = 3;

const Feedback = ({ corretcAnswers }) => {
  const message = corretcAnswers >= PASSING_SCORE ? 'Mandou bem!' : 'Podia ser melhor...';

  return (
    <div>
      <Header />
      <section>
        <h5 data-testid="feedback-text">{ message }</h5>
      </section>
    </div>
  );
};

Feedback.propTypes = {
  corretcAnswers: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  corretcAnswers: state.play.corretcAnswers,
});

export default connect(mapStateToProps)(Feedback);
