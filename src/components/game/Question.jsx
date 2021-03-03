import React from 'react';
import * as trivia from '../../services/trivia';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      result: null,
    };
  }

  async getQuestions() {
    const result = await trivia.getQuestion();
    return result;
  }

    componentDidMount() {
      this.setState({
        questions: this.getQuestions(),
      });
    }

  render() {
    this.getQuestions();
    return (
      <div>
        { JSON.stringify(this.state.questions) }
      </div>
    );
  }
}

export default Question;
