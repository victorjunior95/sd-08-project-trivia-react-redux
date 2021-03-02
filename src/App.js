import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Settings from './pages/Settings';

import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
