import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { feedback, game, login, ranking, settings } from './pages';

export default function App() {
  return (

    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/game" component={ game } />
      <Route path="/ranking" component={ ranking } />
      <Route path="/feedback" component={ feedback } />
      <Route path="/settings" component={ settings } />
    </Switch>
  );
}
