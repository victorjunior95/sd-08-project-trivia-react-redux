import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
            <Route path="/feedback" component={ Feedback } />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
