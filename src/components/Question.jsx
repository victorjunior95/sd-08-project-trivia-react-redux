import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {

}

const mapStateToProps = (store) => ({
  mapQuetions: store.reducerRequestApiTrivia.questions,
  question: store.reducerRequestApiTrivia.currentQuestion,
});

export default connect(mapStateToProps, null)(Question);
