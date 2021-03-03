import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

export default function Header({ name, email, score }) {
  const avatarFromEmail = (mail) => {
    const hash = md5(mail);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  };
  /* const { user } = localStorage.setItem('state', JSON.parse({ player })); */

  const avatar = avatarFromEmail(email);
  return (
    <div className="header">
      <h1>Tela Principal</h1>
      <img
        data-testid="header-profile-picture"
        src={ avatar }
        alt="avatar"
      />
      <h3 data-testid="header-player-name">
        Nome:
        {name}
      </h3>
      <h3 data-testid="header-score">
        Placar:
        {score}
      </h3>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
