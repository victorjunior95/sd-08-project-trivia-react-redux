import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FeedBackScreen = (props) => {
  const { email, name } = props;
  return (
    <div data-testid="feedback-text">
      Feedback Screen para:
      <p>{name}</p>
      <p>{email}</p>
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
});

export default connect(mapStateToProps)(FeedBackScreen);
