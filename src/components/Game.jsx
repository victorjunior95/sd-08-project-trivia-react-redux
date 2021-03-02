import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <div>GGG</div>
    );
  }
}
Game.propTypes = {};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
