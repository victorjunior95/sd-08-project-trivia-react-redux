import React from 'react';
import { connect } from 'react-redux';
import LocalStorage from '../components/LocalStorage';

import Header from '../components/Header';

import { fetchPerguntas } from '../actions';
import Perguntas from '../components/Perguntas';


class Jogo extends React.Component {
  constructor() {
    super();

    this.state = {
      token: '',

    };
  }

  componentDidMount() {
    const { token } = this.state;
    const tokenUser = JSON.parse(localStorage.getItem('token'));
    this.setState({ token: tokenUser });
    this.props.perguntasERespostas(token);
  }

  render() {
    return (
      <div>
        <Perguntas />
        <LocalStorage />

        <Header />

        Jogo


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  perguntasERespostas: ((value) => dispatch(fetchPerguntas(value))),
});

export default connect(null, mapDispatchToProps)(Jogo);
