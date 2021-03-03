import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import Settings from './pages/Settings';
import store from './store';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route path="/settings" component={ Settings } />
          <Route path="/play" component={ Play } />
          <Route path="/" component={ Home } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}
