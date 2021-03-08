import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './main.css';
import Config from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/configuracoes" component={ Config } />
          <Route path="/game" component={ Game } />
          <Route exact path="/" component={ Login } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
