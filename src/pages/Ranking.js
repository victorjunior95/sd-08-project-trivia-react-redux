import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: {
        name: '',
        score: '',
        picture: '',
      },
      state: {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        },
      },

    };
  }

  componentDidMount() {
    this.savePlayer();
    this.saveRanking();
  }

  savePlayer() {
    const { name, email, scoreState, scoreAssertions } = this.props;

    this.setState({
      state: {
        player: {
          name,
          assertions: scoreAssertions,
          score: scoreState,
          gravatarEmail: email,
        },
      },

    }, () => {
      const { state } = this.state;
      localStorage.setItem('state', JSON.stringify(state));
    });

    console.log(name);
  }

  saveRanking() {
    const { name, email, scoreState } = this.props;

    this.setState({
      ranking: {
        name,
        score: scoreState,
        picture: email,
      },

    }, () => {
      const { ranking } = this.state;
      localStorage.setItem('ranking', JSON.stringify([ranking]));
    });

    console.log(name);
  }

  render() {
    const { name, email, scoreState } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          <li>
            <img
              src={ `https://www.gravatar.com/avatar/${email}` }
              alt={ `Imagem de perfil do jogador: ${name}` }
              data-testid="header-profile-picture"
            />
            <p data-testid="player-name">
              {' '}
              {`Jogador: ${name}`}
            </p>
            <p data-testid="player-score">{`Score: ${scoreState}`}</p>
          </li>
        </ul>
        <Link to="/">
          <button type="button" data-testid="btn-go-home"> Voltar ao Inicio </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  scoreState: PropTypes.number.isRequired,
  scoreAssertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.assertionReducer.assertion,
});

export default connect(mapStateToProps)(Ranking);
