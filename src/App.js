import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
