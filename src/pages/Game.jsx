import React, { Component } from 'react';
import Question from '../components/game/Question';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}
