import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Questions from '../components/Questions';

class Play extends React.Component {
  render() {
    const { questions, questionPos } = this.props;
    return (
      <section>
        <Header />
        { questionPos < questions.length || questions.length === 0
          ? (
            <div>
              <Timer />
              <Questions />
            </div>
          )
          : <Redirect to="/feedback" /> }
      </section>
    );
  }
}

Play.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionPos: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  questionPos: state.game.questionPos,
});

export default connect(mapStateToProps)(Play);
