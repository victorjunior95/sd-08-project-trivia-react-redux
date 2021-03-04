import React from 'react';
import { setNewObj } from '../helpers/LocalStorageRelated';

const NUMBER_SIX = 6;
const mockPlayerInfo = { player: {
  name: 'zé-lelé',
  gravatarEmail: 'zelele@gmail.com',
  assertions: (Math.random() * NUMBER_SIX).toFixed(2),
  score: (Math.random() * NUMBER_SIX).toFixed(2),
} };

setNewObj('state', mockPlayerInfo);

class FeedBackHeader extends React.Component {
  constructor(props) {
    super(props);
    const jsonParseState = JSON.parse(localStorage.getItem('state'));
    const { name, assertions, score, gravatarEmail } = jsonParseState.player;
    this.state = {
      playerName: name,
      playerEmail: gravatarEmail,
      correctAnswers: assertions,
      totalScore: score,
    };

    this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
  }

  renderPlayerInfo() {
    const { playerName, playerEmail, playerImg, correctAnswers, totalScore } = this.state;
    const totalQuestions = 5;
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
    const assertionsRender = (
      <h3
        data-testid="correct-answer"
      >
        {`Acertou ${correctAnswers} perguntas!`}
      </h3>);
    const wrongAssertionsRender = (
      <h3
        data-testid="wrong-answer"
      >
        {`Errou ${totalQuestions - correctAnswers} perguntas`}
      </h3>);
    const scoreRender = <h3>{`Seu score é: ${totalScore}`}</h3>;
    return (
      <div>
        {playerNamenEmailRender}
        {playerImgRender}
        {assertionsRender}
        {wrongAssertionsRender}
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
