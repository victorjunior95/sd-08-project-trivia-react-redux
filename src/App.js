import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jogo from './pages/Jogo';
import Set from './pages/Set';

export default function App() {
  return (
    <Switch>
      <Route path="/jogo" render={ (props) => <Jogo { ...props } /> } />
      <Route path="/set" render={ (props) => <Set { ...props } /> } />
      <Route exact path="/" render={ (props) => <Home { ...props } /> } />
    </Switch>
  );
}
