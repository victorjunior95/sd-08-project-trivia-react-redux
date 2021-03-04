import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { fetchQuestions as fetchQuestionsAction } from '../../actions';

class Play extends React.Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  render() {
    return (
      <div>
        <Header />
        Aqui ficará o game
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsAction()),
});

export default connect(null, mapDispatchToProps)(Play);

//   getToken().then(({ token }) => getQuestions(5, token).then((data) => console.log(data)));
