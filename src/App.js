import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

export default App;
