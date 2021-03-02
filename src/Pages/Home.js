import React from 'react';
import Login from './Login';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Login props={ this.props } />
        <button type="button" onClick={ () => this.props.history.push('/config') } data-testid="btn-settings">Configurações</button>
      </div>
    );
  }
}
export default Home;
