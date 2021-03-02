import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken as fetchTokenAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      buttonAble: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
  }

  buttonAble() {
    const { email, name } = this.state;
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minOfCaracteres = 0;
    if (validEmail.test(email) && name.length > minOfCaracteres) {
      this.setState({
        buttonAble: true,
      });
    } else {
      this.setState({
        buttonAble: false,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.buttonAble(); });
  }

  // Criando a função do botão, chamando a API e guardando o token no LocalStorage
  handleClick() {
    fetchTokenAction();
  }

  render() {
    const { email, name, buttonAble } = this.state;
    // const { savedUserData } = this.props;
    return (
      <div>
        <h1>JOGO TRIVIA</h1>
        <section className="login-inputs">
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="name"
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="email"
            data-testid="input-gravatar-email"
          />
        </section>
        <div>
          <Link
            to="/game"
            // onClick={ () => savedUserData({ email, password }) }
          >
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !buttonAble }
            >
              Jogar
            </button>
          </Link>
          <Link
            to="/configuracoes"
            onClick={ this.handleClick } // Fazendo a requisição da API do token pelo clique
            // onClick={ () => savedUserData({ email, password }) }
          >
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configuração
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // savedInputData: (data) => dispatch(savedInput(data)),
  fetchToken: () => dispatch(fetchTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  // savedInputData: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  // currencies: PropTypes.shape({}).isRequired,
};
