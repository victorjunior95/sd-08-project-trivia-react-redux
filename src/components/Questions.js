import React, { Component } from 'react';

export default class Questions extends Component {
  render() {
    return (
      <div>
        <div className="category" data-testid="question-category">
          Politica
        </div>
        <div className="questions" data-testid="question-text">
          Pergunta 01
        </div>
      </div>
    );
  }
}
