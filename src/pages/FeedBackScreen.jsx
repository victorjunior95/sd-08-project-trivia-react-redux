import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import FeedbackScreenHeader from '../components/FeedbackScreenHeader';

const FeedBackScreen = (props) => {
  const { email, name, score } = props;
  const hash = md5(email).toString();
  const src = `https://www.gravatar.com/avatar/${hash}`;
  return (
    <div data-testid="feedback-text">
      <FeedbackScreenHeader image={ src } name={ name } score={ score } />
    </div>
  );
};

FeedBackScreen.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  score: state.score,
});

export default connect(mapStateToProps)(FeedBackScreen);
