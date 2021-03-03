import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleInput } from '../redux/actions';

function FormsLogin(props) {
  const { handleInp, nome, email } = props;
  console.log(handleInp);
  return (
    <form>
      <label htmlFor="name">
        NOME
        <input
          value={ nome }
          type="text"
          name="name"
          id="name"
          data-testid="input-player-name"
          onChange={ (event) => handleInp('name', event.target.value) }
        />
      </label>
      <label htmlFor="email">
        EMAIL
        <input
          value={ email }
          type="email"
          name="email"
          id="email"
          data-testid="input-gravatar-email"
          onChange={ (event) => handleInp('email', event.target.value) }
        />
      </label>
      <button type="button" data-testid="btn-play">Jogar</button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  email: state.email,
  nome: state.nome,
});

const mapDispatchToProps = (dispatch) => ({
  handleInp: dispatch((position, input) => handleInput(position, input)),
});

FormsLogin.propTypes = {
  handleInp: PropTypes.func,
  email: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormsLogin);
