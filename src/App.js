import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';
import Settings from './pages/Settings';
import FeedBack from './pages/Feedback';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/game" exact component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ FeedBack } />
      </Switch>
    </div>
  );
}
