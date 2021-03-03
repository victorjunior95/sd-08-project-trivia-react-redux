import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import GameScreenHeader from '../components/GameScreenHeader';

const GameScreen = (props) => {
  const { email, name } = props;

  const hash = md5(email).toString();
  const src = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <div>
      <GameScreenHeader image={ src } name={ name } />
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.email,
  name: state.name,
});

export default connect(mapStateToProps)(GameScreen);
