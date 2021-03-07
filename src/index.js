import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './redux/store';
import './styles/global.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <PersistGate persistor={ persistor }>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
