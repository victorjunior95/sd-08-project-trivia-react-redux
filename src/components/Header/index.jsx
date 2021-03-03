import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  render() {
    const { score } = this.state;
    const { playerName, gravatarPatch } = this.props;
    return (
      <header>
        <img 
          data-testid="header-profile-picture"
          src={ gravatarPatch }
          alt="Imagem de perfil do Gravatar"
        />
        <div data-testid="header-player-name">
          {playerName}
        </div>
        <div data-testid="header-score">
          {score}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  gravatarPatch: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.user.name,
  gravatarPatch: state.user.gravatarPatch,
})

export default connect(mapStateToProps)(Header);

