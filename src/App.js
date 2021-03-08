import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import RankingPage from './pages/RankingPage';
import SettingsPage from './pages/SettingsPage';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ GamePage } />
        <Route path="/settings" component={ SettingsPage } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ RankingPage } />
        <Route exact path="/" component={ LoginPage } />
      </Switch>
    </div>
  );
}
