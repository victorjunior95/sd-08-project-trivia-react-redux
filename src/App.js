import React from 'react';
import logo from './trivia.png';
import './App.css';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
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
