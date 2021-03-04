import React from 'react';

class FeedBackHeader extends React.Component {
  constructor(props) {
    super(props);

    const jsonParse = JSON.parse(localStorage.getItem('player'));
    const { name, assertions, score, gravatarEmail } = jsonParse;

    this.state = {
      playerName: name,
      playerEmail: gravatarEmail,
      correctAnswers: assertions,
      totalScore: score,
    };

    this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
  }

  componentDidMount() {
    const MAX_NUMBER = 6;
    const player = {
      name: 'zé-lelé',
      assertions: Math.random() * MAX_NUMBER,
      score: Math.random() * MAX_NUMBER,
      gravatarEmail: 'xablau@gmail.com',
    };
    localStorage.setItem('player', JSON.stringify(player));
  }

  renderPlayerInfo() {
    const { playerName, playerEmail, playerImg, correctAnswers, totalScore } = this.state;
    const playerImgRender = (<img
      data-testid="header-profile-picture"
      src={ playerImg }
      alt="player-avatar"
    />);
    const playerNamenEmailRender = (
      <h2
        data-testid="header-player-name"
      >
        {`Jogador ${playerName} com e-mail: ${playerEmail}`}
      </h2>);
    const assertionsRender = <h3>{`Acertou ${correctAnswers} perguntas!`}</h3>;
    const scoreRender = <h3>{`Seu score é: ${totalScore}`}</h3>;
    return (
      <div>
        {playerNamenEmailRender}
        {playerImgRender}
        {assertionsRender}
        {scoreRender}
      </div>);
  }

  render() {
    return (
      <div>
        {this.renderPlayerInfo()}
      </div>);
  }
}

export default FeedBackHeader;
