import React from 'react';

// const url = 'https://www.gravatar.com/avatar/5a434b307b728b98080610414c6788497df4e9ed';
/* const getimg = async () => {
  const fatchimg = await fetch(url)
    .then((response) => response.json());
    .then((data)=>data.img )

}; */
function HeaderFeedBack() {
  return (
    <head>
      <img src="https://s.gravatar.com/avatar/6791ab1c56a700f2fc41e7fa358deeeb?s=80" alt="imagem avatar" data-testid="header-profile-picture" />
      <span data-testid="header-player-name">{okok}</span>
      <span data-testid="header-score">{ok}</span>
      <span>{okok}</span>
    </head>
  );
}
