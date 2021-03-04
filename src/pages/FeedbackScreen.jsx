import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameScreenHeader from '../components/GameScreenHeader';

const FeedbackScreen = (props) => {
  const { email, name } = props;
  const hash = md5(email).toString();
  const src = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <div>
      Feedback Screen
      <GameScreenHeader image={ src } name={ name } />
    </div>
  );
};

FeedbackScreen.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(FeedbackScreen);
