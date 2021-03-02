import React from 'react';

class FormLogin extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input data-testid="input-player-name" type="text" />
          <input data-testid="input-gravatar-email" type="text" />
          <button data-testid="btn-play" type="button">Jogar</button>
        </form>
      </div>
    );
  }
}

export default FormLogin;
