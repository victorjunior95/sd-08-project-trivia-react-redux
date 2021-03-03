import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jogo from './components/Jogo';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/jogo" render={ (props) => <Jogo { ...props } /> } />
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
      </Switch>
    </div>
  );
}
