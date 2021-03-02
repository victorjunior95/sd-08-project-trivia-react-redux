import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import GamePage from './pages/GamePage';

export default function App() {
  // const isAuth = useSelector(state => state.app.isAuth);

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ GamePage } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
