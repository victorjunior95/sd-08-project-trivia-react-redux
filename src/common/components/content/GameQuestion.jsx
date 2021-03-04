import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPITrivia } from '../../../store/actions/index';

class GameQuestion extends Component {

  async componentDidMount() {
    const { fetchAPI } = this.props;
    await fetchAPI();
  }

  render() {
    const { questions } = this.props;
    return (
      <section>
        {console.log(questions)}
        {/* <span data-testid="question-category">
          {category}
        </span>
        <p data-testid="question-text">
          {Question}
        </p> */}

      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.question.data });

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPITrivia()) });

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
