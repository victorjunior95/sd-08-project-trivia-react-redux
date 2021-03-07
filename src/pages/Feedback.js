import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.feedback = this.feedback.bind(this);
  }

  feedback() {
    const { countCorrect } = this.props;
    let phrase = '';
    const goodMedia = 3;
    if (countCorrect < goodMedia) {
      phrase = 'Podia ser melhor...';
    } else {
      phrase = 'Mandou bem!';
    }
    return (<p data-testid="feedback-text">{phrase}</p>);
  }

  render() {
    return (
      <div>
        <Header />
        {this.feedback()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  countCorrect: state.login.countCorrect,
});

Feedback.propTypes = {
  countCorrect: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Feedback);
