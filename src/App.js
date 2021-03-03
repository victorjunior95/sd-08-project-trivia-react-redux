import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Config } from './pages/configPage/Config';

import Home from './pages/Home';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}
