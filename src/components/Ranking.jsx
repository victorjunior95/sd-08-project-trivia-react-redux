import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <section>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            VOLTAR
          </button>
        </Link>
      </section>
    );
  }
}
/*
Ranking.propTypes = {};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
*/
export default connect(null, null)(Ranking);
