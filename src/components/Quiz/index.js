import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { fetchQuiz } from '../../redux/actions';
import CardGame from '../CardGame';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { getQuiz, token } = this.props;
    await getQuiz(token);
    this.handleChange();
  }

  handleChange() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    const { quiz, score } = this.props;
    // console.log(quiz[0]);

    if (loading) return <Loading />;

    return (
      <div>
        <CardGame element={ quiz[0] } score={ score } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  quiz: state.quiz.quiz,
  score: state.score.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (token) => dispatch(fetchQuiz(token)),
});

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
