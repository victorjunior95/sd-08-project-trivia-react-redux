import React from 'react';

class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // questions,
      index: 0,
    };
  }

  handleClick() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  }

  render() {
    const { index } = this.state;
    // const { questions } = this.props;
    return (
      <>
        {/* <h2>{ questions[index].category }</h2>
        <h1>Question</h1> */}
      </>
    );
  }
}

export default QuestionScreen;
