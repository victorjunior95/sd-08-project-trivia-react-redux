import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   index: 0,
    // };

    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  // }

  handleClick() {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
  }

  render() {
    const { userName, email, score } = this.props;
    return (
      <>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="profile-avatar"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ userName }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <div data-testid="">
          <div data-testid="question-category">Categoria</div>
          <div data-testid="question-text">Pergunta</div>
          <div data-testid="">Tempo</div>
          <button
            type="button"
            data-testid=""
          >
            Alternativas
          </button>
          <button
            type="button"
            data-testid=""
            onClick={ this.handleClick }
          >
            Próxima
          </button>
        </div>
      </>
    );
  }
}

Trivia.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
  questions: state.trivia.questions,
});

export default connect(mapStateToProp)(Trivia);
