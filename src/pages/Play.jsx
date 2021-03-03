import React from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Play extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <Questions />
      </section>
    );
  }
}

export default Play;
