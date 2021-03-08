import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.loadAssertions = this.loadAssertions.bind(this);
  }

  loadAssertions() {
    const stateString = localStorage.getItem('state');
    console.log(stateString);
    const stateObject = JSON.parse(stateString);
    console.log(stateObject);
    const { player: { assertions } } = stateObject;
    console.log(assertions);
    const THREE = 3;
    if (assertions < THREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    this.loadAssertions();
    return (
      <div data-testid="feedback-text">
        {this.loadAssertions()}
      </div>
    );
  }
}

export default Feedback;
