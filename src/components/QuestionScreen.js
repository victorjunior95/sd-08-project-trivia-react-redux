import React from 'react';
import { connect } from 'react-redux';

class QuestionScreen extends React.Component {
  componentDidMount() {
    this.questionPicker();
  }

  questionPicker() {
    const FIVE = 4;
    const questionIndex = Math.floor(Math.random() * FIVE);
    return questionIndex;
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <>
        <h2>{}</h2>
        <h1>Question</h1>
      </>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions,
});

// export default QuestionScreen;
export default connect(mapStateToProps)(QuestionScreen);
