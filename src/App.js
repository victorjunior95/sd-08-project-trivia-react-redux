import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import LoginForm from './components/LoginForm';

export default function App() {
  return (
    <Provider store={ store }>
      <div>
        <LoginForm />
      </div>
    </Provider>
  );
}
