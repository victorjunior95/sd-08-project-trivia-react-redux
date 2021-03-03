import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { name, score, email } = this.props;
    return (
      <div>
        {console.log(name, score, email)}
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="Gravatar"
          width="150px"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-player-name">{score}</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { player } = state;
  return {
    name: player.name,
    score: player.score,
    email: player.email,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {

//   };
// }

Feedback.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
};

Feedback.defaultProps = {
  name: '',
  score: 0,
  email: 'any@gmail.com',
};

export default connect(
  mapStateToProps,
)(Feedback);
