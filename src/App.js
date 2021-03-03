import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Gamescreen from './pages/Gamescreen';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gamescreen" component={ Gamescreen } />
      </Switch>
    );
  }
}

export default App;
