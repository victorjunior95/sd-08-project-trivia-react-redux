import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import logo from './trivia.png';
import './App.css';
import Play from './Pages/Play';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
        </Switch>

      </header>
    </div>
  );
}
