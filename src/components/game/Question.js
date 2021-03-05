import React from 'react';
import { connect } from 'react-redux';
// import { questions, retrieveQuestions as getQuestionAction } from '../../actions/questions';
import { getQuestions } from '../../actions/question';
import { getAPIQuestions } from '../../services/trivia';

class Question extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   question: [],
    // };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { sendQuestions } = this.props;
    const result = await getAPIQuestions();
    sendQuestions(result);
  }

  render() {
    const { question } = this.props;
    console.log(question[0]);
    return (
      <div>teste</div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (payload) => dispatch(getQuestions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
