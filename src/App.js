import React from 'react';
import Login from './Pages/Login';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <Login props1="Hi" />
      </header>
    </div>
  );
}
