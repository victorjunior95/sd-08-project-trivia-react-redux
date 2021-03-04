import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {

//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {

//   };
// }

export default connect(
  null,
  null,
)(Ranking);
