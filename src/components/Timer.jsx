import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countSeconds: 30,
      shouldCheck: true,
      interval: '',
    };

    this.counterDown = this.counterDown.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
  }

  componentDidMount() {
    this.counterDown();
  }

  getAnswer() {
    const { countSeconds } = this.state;
    const { questions } = this.props;
    const difficult = questions.map((question) => question.difficulty);
    const difficultyLevel = { hard: 3, medium: 2, easy: 1 };
    const TEN = 10;
    const points = TEN + (countSeconds * difficultyLevel[difficult[0]]);
    const { player } = JSON.parse(localStorage.getItem('state'));
    localStorage.setItem('state', JSON.stringify({
      player: { ...player, score: points + player.score },
    }));
  }

  stopWatch(interval) {
    clearInterval(interval);
    this.getAnswer();
  }

  counterDown() {
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      const { countSeconds } = this.state;
      if (countSeconds <= 1) {
        this.stopWatch(interval);
      }
      this.setState({ countSeconds: countSeconds - 1, interval });
    }, ONE_SECOND);
  }

  render() {
    const { countSeconds, shouldCheck, interval } = this.state;
    const { verify, disabled } = this.props;
    if (shouldCheck && countSeconds === 0) {
      this.setState({ shouldCheck: false }, () => {
        verify(true);
      });
    }
    if (shouldCheck && disabled) {
      this.setState({ shouldCheck: false }, () => {
        this.stopWatch(interval);
      });
    }
    return (
      <section>{ countSeconds }</section>
    );
  }
}

const mapStateToProps = (store) => ({
  questions: store.reducerRequestApiTrivia.questions,
});

Timer.propTypes = {
  verify: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Timer);
