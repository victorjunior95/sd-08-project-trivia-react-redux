import React from 'react';

import Login from './pages/Login';
import './App.css';
import Settings from './components/Settings';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showSettings: false,
    };

    this.openSettings = this.openSettings.bind(this);
  }

  openSettings() {
    const { showSettings } = this.state;
    this.setState({ showSettings: !showSettings });
  }

  render() {
    const { showSettings } = this.state;
    return (
      <>
        <header className="App-header">
          <p>Vamos nessa!</p>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.openSettings }
          >
            settings
          </button>
        </header>
        {showSettings && <Settings openSettings={ this.openSettings } />}
        <Login />
      </>
    );
  }
}

export default App;
