import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configurations from './pages/Configurations';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/configurations" component={ Configurations } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
