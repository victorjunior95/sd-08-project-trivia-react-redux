import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './images/trivia.png';
import Login from './components/pages/Login';
import Game from './components/pages/Game';
import Feedback from './components/pages/Feedback';
import Settings from './components/pages/Settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
