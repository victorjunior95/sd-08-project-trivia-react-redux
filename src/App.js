import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Config from './pages/Config';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/game-page" component={ GamePage } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
