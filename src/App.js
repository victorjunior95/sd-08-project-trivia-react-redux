import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
