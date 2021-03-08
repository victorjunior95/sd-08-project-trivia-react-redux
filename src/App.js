import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import { Login, TriviaGame, Settings, Feedback } from './pages';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/triviagame" component={ TriviaGame } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
