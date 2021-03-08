import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Header(props) {
  const { hash, name, score = 0 } = props;
  return (
    <header>
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } data-testid="header-profile-picture" alt="imagem de perfil" />
      </div>
      <div>
        <p data-testid="header-player-name">{name}</p>
      </div>
      <div>
        <span data-testid="header-score">{score}</span>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  hash: state.user.hash,
  name: state.user.name,
  score: state.player.score,
});

Header.propTypes = {
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
