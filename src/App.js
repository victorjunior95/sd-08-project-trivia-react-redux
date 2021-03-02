import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogar from './pages/Jogar';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogar" component={ Jogar } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}
