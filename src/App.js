import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Feedback from './components/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/feedback" exact component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
