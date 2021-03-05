import React from 'react'
import { Route, Router, Switch } from "react-router"

import { history } from '../history'

import Trivia from '../Pages/Trivia'
import Jogo from '../Pages/Jogo'
import Rank from '../Pages/Rank'
import Comentarios from '../Pages/Comentarios'
import Config from '../Pages/Config'

const Routes = () => {
    <Router history={ history }>
        <Switch>
            <Route component={ Trivia } exact path="/" />
            <Route component={ Jogo } exact path="/jogo" />
            <Route component={ Rank } exact path="/Rank" />
            <Route component={ Comentarios } exact path="/Comentarios" />
          <Route component={ Config } exact path="/Config" />
        </Switch>
    </Router>
}

export default Routes;
