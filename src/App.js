import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, Game } from './pages/index';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
        </Switch>
      </header>
    </div>
  );
}
