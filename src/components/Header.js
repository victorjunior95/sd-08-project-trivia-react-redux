import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import gravatarAPI from '../services/gravatarAPI';
// import './Header.css';

 class Header extends Component {
  render() {
    const { scorePlayer = 0 } = this.props;;
    const namePlayer = 'teste';
    const emailPlayer = 'um@email.com'
    // const namePlayer = localStorage.getItem('namePlayer');
    // const emailPlayer = localStorage.getItem('emailPlayer');
    // console.log(namePlayer);
    return (
      <section>
        <div className="player-info">
          <img
            alt="Player Avatar"
            data-testid="header-profile-picture"
            src={ gravatarAPI(emailPlayer) }
          />
          Nome da pessoa: 
          <p data-testid="header-player-name">{ namePlayer }</p>
        </div>
        <div>
          Placar:
          <span data-testid="header-score">{ scorePlayer }</span>
        </div>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
//   // emailPlayer: state.player.emailPlayer,
//   // namePlayer: state.player.namePlayer,
//   // scorePlayer: state.player.scorePlayer,
// });

// Header.propTypes = {
//   // emailPlayer: PropTypes.string.isRequired,
//   // namePlayer: PropTypes.string.isRequired,
//   // scorePlayer: PropTypes.number.isRequired,
// };

export default Header
// export default connect(mapStateToProps, null)(Header);


