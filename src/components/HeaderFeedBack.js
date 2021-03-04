import React from 'react';

export default function HeaderFeedBack() {
  const url = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
  return (
    <head>
      <img src={ url } alt="avatar image" data-testid="header-profile-picture" />
      <span data-testid="header-player-name">{payload.name}</span>
      <span data-testid="header-score">{payload.score}</span>
    </head>
  );
}
