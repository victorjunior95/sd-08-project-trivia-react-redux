import React from 'react';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Questions from '../components/Questions';

class Play extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <Timer />
        <Questions />
      </section>
    );
  }
}

export default Play;
