import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Config from './pages/Config';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/config" exact component={ Config } />
    </Switch>
  );
}
