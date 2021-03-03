import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import store from './store';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route path="/" component={ Home } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}
