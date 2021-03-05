import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { img, name, score, assertions } = this.props;
    const minAssertions = 3;
    return (
      <section>
        <header>
          <img src={ img } alt="avatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <p data-testid="feedback-text">
          { assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
      </section>
    );
  }
}

Feedback.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  img: state.user.urlPicture,
  name: state.user.name,
  score: state.game.score,
  assertions: state.game.assertions,
});

export default connect(mapStateToProps)(Feedback);
