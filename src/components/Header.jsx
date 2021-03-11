import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, scoreState } = this.props;
    let score = scoreState.reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
    ;
    md5(email).toString();
    return (
      <header className="HeaderContent">
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt={ `Imagem de perfil do jogador: ${name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        </div>
        <p data-testid="header-score">{`Score: ${parseFloat(score)}`}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score

});


Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
