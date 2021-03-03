import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import CardQuestion from './CardQuestion';

class Game extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <div>GAME</div>
        <CardQuestion question={ questions[0] } />
        <button type="button">Próximo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.login.questions,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
