import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
