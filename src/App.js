import React from 'react';
import { connect } from 'react-redux';
import logo from './trivia.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  a: console.log(state),
  email: state.email,
  nome: state.nome,
});

export default connect(mapStateToProps)(App);
