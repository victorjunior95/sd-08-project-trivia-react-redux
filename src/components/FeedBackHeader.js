import React from 'react';

class FeedBackHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 3,
      playerName: 'zé-lelé',
      playerImg: 'player-img.jpg',
    };

    this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
  }

  renderPlayerInfo() {
    // const { score } = this.props; ou
    // const jsonFile = localStorage.getItem(score)
    // const score = JSON.parse(jsonFile).score
    const { score, playerName, playerImg } = this.state;
    const playerImgRender = (<img
      data-testid="header-profile-picture"
      src={ playerImg }
      alt="player"
    />);
    const playerNameRender = <h3 data-testid="header-player-name">{playerName}</h3>;
    const scoreRender = <h3>{`Seu score é: ${score}`}</h3>;
    return (
      <div>
        {playerNameRender}
        {playerImgRender}
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
