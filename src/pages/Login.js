import React from 'react';
import { connect } from 'react-redux';
import { fetchToken, fetchAPI } from '../actions';

class Login extends React.Component {
  render() {
    return (
      <div>
        Hello Trivia!
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.triviaAPI.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: () => dispatch(fetchToken()),
  APIRequest: (token) => dispatch(fetchAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
