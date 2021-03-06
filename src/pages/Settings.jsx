import React, { Component } from 'react';
import ButtonHome from '../components/ButtonHome';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">settings</h1>
        <ButtonHome />
      </div>
    );
  }
}

export default Settings;
