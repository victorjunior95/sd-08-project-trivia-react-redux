import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class FeedbackScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gravatarEmail: '',
      name: '',

    };

    this.setHashedEmail = this.setHashedEmail.bind(this);
  }

  componentDidMount() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail, name } = getLocalStorage.player;
    const convert = md5(gravatarEmail);
    this.setHashedEmail(convert, name);
  }

  setHashedEmail(gravatarEmail, name) {
    this.setState({
      gravatarEmail,
      name,
    });
  }

  feedBack(total) {
    const MIN_CORRECT = 3;
    return total < MIN_CORRECT ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { total, totalQuestions } = this.props;
    const { gravatarEmail, name } = this.state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            alt="seila"
          />
          <h1 data-testid="header-player-name">{ name }</h1>
          <p data-testid="feedback-total-score">{ total }</p>
          <p data-testid="feedback-total-question">{ totalQuestions }</p>
        </header>
        <h1 data-testid="feedback-text">{ this.feedBack(totalQuestions) }</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  total: state.perguntasReducer.acertos,
  totalQuestions: state.perguntasReducer.questions,
});

FeedbackScreen.propTypes = {
  total: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(FeedbackScreen);
