import React from 'react';

class HeaderFeedback extends React.Component {
  render() {
    const url = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    return (
      <div>
        <img src={ url } alt="avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">Nome</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

export default HeaderFeedback;
