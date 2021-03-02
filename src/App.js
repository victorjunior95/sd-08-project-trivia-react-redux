import React from 'react';
import logo from './trivia.png';
import './App.css';
import { feedback, game, login, ranking, settings } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ settings } />
      </Switch>
      {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>

      </header>
    </div> */}
    </Router>

  );
}
