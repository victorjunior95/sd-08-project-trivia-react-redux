import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { thunk } from '../redux/action';

class Game extends React.Component {
  componentDidMount() {
    const { requestApi, difficulty } = this.props;
    requestApi(difficulty);
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestApi: (difficulty) => dispatch(thunk(difficulty)),
});

const mapStateToProps = (state) => ({
  difficulty: state.reducerRequestApiTrivia.difficulty,
});

Game.propTypes = {
  requestApi: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
