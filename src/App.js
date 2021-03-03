import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, Play, Settings } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Play } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
