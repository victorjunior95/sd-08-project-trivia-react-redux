import React from 'react';
import * as trivia from '../../services/trivia';
import { questions, retrieveQuestions as getQuestionAction } from '../../actions/Questions';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      question: [],
    };
  }

  componentDidMount() {
    const { retrieveQuestions } = this.props;
    retrieveQuestions();
  }

  render() {
    const { question } = this.props;
    console.log(question);
    return (
      <div>teste</div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.Questions,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveQuestions: () => dispatch(getQuestionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
