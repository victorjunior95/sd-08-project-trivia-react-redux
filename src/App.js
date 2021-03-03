import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Settings, Game } from './pages';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
