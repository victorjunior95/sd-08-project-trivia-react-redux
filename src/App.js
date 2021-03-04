import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './Pages/Login';
import Play from './Pages/Play';
import Settings from './Pages/Settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </header>
    </div>
  );
}
