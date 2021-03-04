import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
