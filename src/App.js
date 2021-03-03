import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';
import Game from './pages/Game';
import Score from './pages/Score';
import Ranking from './pages/Ranking';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/score" component={ Score } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/ranking" component={ Ranking } />
          <Route component= { NotFound } />
        </Switch>
      </BrowserRouter>

    </div>
  );
}
