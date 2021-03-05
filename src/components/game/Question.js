import React from 'react';
import * as trivia from '../../services/trivia';
import { questions, retrieveQuestions as getQuestionAction } from '../../actions/questions';
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
    console.log(question.questions.questions);
    return (
      <div>teste</div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveQuestions: () => dispatch(getQuestionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
