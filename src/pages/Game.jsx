import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { thunk } from '../redux/action';

class Game extends React.Component {
  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
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
  requestApi: () => dispatch(thunk()),
});

Game.propTypes = {
  requestApi: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
