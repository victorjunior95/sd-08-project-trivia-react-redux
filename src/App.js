import React from 'react';

import Login from './pages/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <header className="App-header">
          <p>Vamos nessa!</p>
        </header>
        <Login />
      </>
    );
  }
}

export default App;
