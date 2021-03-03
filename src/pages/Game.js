import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './Game.css';
import md5 from 'crypto-js/md5';
import { getingHashEmail } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    this.cryptoEmail();
  }

  cryptoEmail() {
    const { readInputs, getHashEmail } = this.props;
    const { email } = readInputs;
    const emailHash = md5(email).toString();
    getHashEmail(emailHash);
    // console.log();
  }

  render() {
    const { readInputs } = this.props;
    const imgGravatar = `https://www.gravatar.com/avatar/${readInputs.HashEmail}`;

    return (
      <div className="container">
        <div className="container-player">
          <div className="header-palyer">
            <img
              data-testid="header-profile-picture"
              className="gravatar-image"
              src={ imgGravatar }
              alt="gratavar perfil"
            />
            <div data-testid="header-player-name" className="player-name">
              {readInputs.name}
            </div>
            <div data-testid="header-score" className="score-player">
              Pontos: 20
            </div>
          </div>
          <div className="body-palyer">game Body</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readInputs: state.loginReducer,
});
const mapDispatchToProps = (dispatch) => ({
  getHashEmail: (HashEmail) => dispatch(getingHashEmail(HashEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  readInputs: PropTypes.objectOf(PropTypes.any).isRequired,
  getHashEmail: PropTypes.func.isRequired,
};
