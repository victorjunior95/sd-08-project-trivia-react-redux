import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Config from './Pages/Config';
import Home from './Pages/Home';
import Jogo from './Pages/Jogo';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact render={(props) => <Home {...props} />} />
        <Route path='/config' exact render={(props) => <Config {...props} />} />
        <Route path='/jogo' exact render={(props) => <Jogo {...props} />} />
      </Switch>
    );
  }
}

export default App