import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { login, game, feedback, ranking, settings } from './pages';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ login } />
        <Route path="/game" component={ game } />
        <Route path="/ranking" component={ ranking } />
        <Route path="/settings" component={ settings } />
        <Route path="/feedback" component={ feedback } />
      </Switch>
    </Router>
  );
}
