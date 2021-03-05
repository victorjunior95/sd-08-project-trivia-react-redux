import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { logout as logoutAction } from '../actions/user';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.click = this.click.bind(this);
  }

  click() {
    const { logout } = this.props;
    logout();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;

    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt={ name } />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <p data-testid={ `player-score-${index}` }>{ score }</p>
          </div>
        )) }
        <button type="button" onClick={ this.click } data-testid="btn-go-home">
          Início
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
