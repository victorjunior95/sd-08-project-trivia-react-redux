import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/GamePage" component={ GamePage } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
