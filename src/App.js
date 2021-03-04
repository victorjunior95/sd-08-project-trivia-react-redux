import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Play from './Pages/Play';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
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
          <Route path="/feedback">
            <Feedback />
          </Route>
        </Switch>
      </header>
    </div>
  );
}
