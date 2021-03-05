import React, { Component } from 'react';
import Trivia from './Pages/Trivia';

import Routes from './components/Routes'

class App extends Component {
  render() { 
    return ( 
      <React.Fragment>
        <Trivia />
        <Routes />
      </React.Fragment>
     );
  }
}
 
export default App;
