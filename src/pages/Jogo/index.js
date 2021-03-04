import React from 'react';
import Header from '../../components/HeaderJogo';
import Jogo from './Jogo';

class Jogar extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Jogo />
      </main>
    );
  }
}

export default Jogar;
