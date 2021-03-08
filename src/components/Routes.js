import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Trivia from '../Pages/Trivia';
import Jogo from '../Pages/Jogo';
import Rank from '../Pages/Rank';
import Comentarios from '../Pages/Comentarios';
import Config from '../Pages/Config';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route component={ Trivia } exact path="/" />
      <Route component={ Jogo } exact path="/jogo" />
      <Route component={ Feedback } exact path="/feedback" />
      <Route component={ Rank } exact path="/Rank" />
      <Route component={ Comentarios } exact path="/Comentarios" />
      <Route component={ Config } exact path="/Config" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
