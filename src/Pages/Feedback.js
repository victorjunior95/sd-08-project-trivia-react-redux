import React from 'react';
import { connect } from 'react-redux';

class FeedbackScreen extends React.Component {
  render() {
    const { total } = this.props;
    return (
      <div>{total}</div>
    );
  }
}
const mapStateToProps = (state) => ({
  total: state.perguntasReducer.acertos,
});
export default connect(mapStateToProps, null)(FeedbackScreen);
