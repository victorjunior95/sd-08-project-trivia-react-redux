import React from 'react';
import { Provider } from 'react-redux';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    </Provider>
  );
}
