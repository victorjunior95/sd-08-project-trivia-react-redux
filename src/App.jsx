import React from 'react';
<<<<<<< HEAD
=======
// import { useSelector, useDispatch } from 'react-redux';
>>>>>>> origin/main-group-20
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Game from './pages/Game';

<<<<<<< HEAD
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
=======
export default function App() {
  // const isAuth = useSelector(state => state.app.isAuth);

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ Game } />
>>>>>>> origin/main-group-20
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
