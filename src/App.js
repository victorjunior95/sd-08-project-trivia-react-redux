import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  a: console.log(state),
  email: state.email,
  nome: state.nome,
});

export default connect(mapStateToProps, null)(App);
// fix
