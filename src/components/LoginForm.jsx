import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { playerNomeAction, playerEmailAction } from '../Redux/actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { email, nome, playerNome, playerEmail } = this.props;
    const { shouldRedirect } = this.state;

    const inputNameValid = nome.length > 0;
    const inputEmailValid = email.length > 0;
    const isValid = inputNameValid && inputEmailValid;

    if (shouldRedirect) return <Redirect to="/teste" />;
    return (
      <form>
        <input
          data-testid="input-player-name"
          type="text"
          onChange={ (value) => playerNome(value) }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          onChange={ (value) => playerEmail(value) }
        />
        <button
          data-testid="btn-play"
          disabled={ !isValid }
          type="button"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  nome: player.nome,
  email: player.email,
});

const mapDispatchToProps = (dispatch) => ({
  playerNome: (value) => dispatch(playerNomeAction(value)),
  playerEmail: (value) => dispatch(playerEmailAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  playerNome: PropTypes.func.isRequired,
  playerEmail: PropTypes.func.isRequired,
};
