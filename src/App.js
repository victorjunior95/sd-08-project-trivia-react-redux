import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route path="/config" component={ Config } />
      {/* <Route path="/trivia" component={ Trivia } /> */}
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
