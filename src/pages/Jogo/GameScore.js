import React from 'react';

class gameScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'João',
      assertions: 0,
      score: 0,
      gravatarEmail: 'joao@email.com',
    };
    this.handleScore = this.handleScore.bind(this);
  }

  handleScore() {
    const { assertions, score } = this.state;
    this.setState({
      assertions: assertions + 1,
      score: score + 1,
    });
  }

  render() {
    const { assertions, score } = this.state;
    return (
      <>
        <p>assertations</p>
        { assertions }
        <p>score</p>
        { score }
        <button
          type="button"
          onClick={ this.handleScore }
        >
          somar
        </button>
      </>
    );
  }
}

export default gameScore;
