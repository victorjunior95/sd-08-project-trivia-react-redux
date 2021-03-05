import React from 'react';
import GameBoard from '../Components/GameBoard';
import Header from '../Components/Header';

class Play extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <Header />
        <GameBoard />
      </div>
    );
  }
}

export default Play;
