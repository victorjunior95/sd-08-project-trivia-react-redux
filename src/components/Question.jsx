import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  render() {
    return <h1>Question</h1>;
  }
}

const mapStateToProps = (store) => ({
  mapQuetions: store.reducerRequestApiTrivia.questions,
  question: store.reducerRequestApiTrivia.currentQuestion,
});

export default connect(mapStateToProps, null)(Question);
