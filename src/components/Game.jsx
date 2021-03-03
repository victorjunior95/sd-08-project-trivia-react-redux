import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchTriviaQuest from '../services/requestTriviaQuest';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      quests: [],
      questionOrder: 0,
    };
  }

  componentDidMount() {
    fetchTriviaQuest().then((quest) => {
      this.setState({
        quests: quest.results,
      });
    });
  }

  render() {
    const { email, playerName } = this.props;
    const emailHash = md5(email).toString();
    const { quests } = this.state;
    console.log(quests);
    if (quests.length > 0) {
      return (
        <>
          <section className="game-header">
            <div>
              <img
                data-testid="header-profile-picture"
                src={ `https://www.gravatar.com/avatar/${emailHash}` }
                alt="player-img"
              />
              Jogador:
              <span data-testid="header-player-name">{ playerName }</span>
            </div>
            <div>
              Pontos:
              <span data-testid="header-score"> 0</span>
            </div>
          </section>
          <section className="game-question">
            <h2 data-testid="question-category">
              Categoria:
              { quests[0].category }
            </h2>
            <h2 data-testid="question-text">
              { quests[0].question }
            </h2>
            <button
              type="button"
              data-testid="correct-answer"
            >
              { quests[0].correct_answer }
            </button>
            <button
              type="button"
              data-testid="wrong-answer-0"
            >
              { quests[0].incorrect_answers[0] }
            </button>
            <button
              type="button"
              data-testid="wrong-answer-1"
            >
              { quests[0].incorrect_answers[1] }
            </button>
            <button
              type="button"
              datta-testid="wrong-answer-2"
            >
              { quests[0].incorrect_answers[2] }
            </button>

            <button type="button">PRÓXIMA</button>
          </section>
        </>
      );
    }
    return (<span>Loading</span>);
  }
}
Game.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};
const mapStateToProps = ({ login: { email, playerName } }) => ({
  email,
  playerName,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Game);
