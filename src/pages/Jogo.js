import React from 'react';
import LocalStorage from '../components/LocalStorage';
import Header from '../components/Header';

class Jogo extends React.Component {
  render() {
    return (
      <div>
        <LocalStorage />
        <Header />
      </div>
    );
  }
}

export default Jogo;
