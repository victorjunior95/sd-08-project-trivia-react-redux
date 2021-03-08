import React from 'react';
import Header from '../../components/Header';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          Aqui ficará o Feedback
        </p>
      </div>
    );
  }
}
