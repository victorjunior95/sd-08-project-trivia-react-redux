import React from 'react';
import './App.css';

import { Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import ConfigPage from './pages/ConfigPage';
import RankingPage from './pages/RankingPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navBar">
          <Link to="/">Login</Link>
          <Link to="/configPage">Configurações</Link>
          <Link to="/rankingPage">Rankings</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/configPage" component={ ConfigPage } />
          <Route exact path="/rankingPage" component={ RankingPage } />
        </Switch>
      </div>
    );
  }
}

export default App;
