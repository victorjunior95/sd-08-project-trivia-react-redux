import React from 'react';
import './App.css';

import { Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    )
  }
}

export default App;
