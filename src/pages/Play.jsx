import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Questions from '../components/Questions';

class Play extends React.Component {
  render() {
    const { questions, questionPos, name, img, score } = this.props;
    if (questionPos >= questions.length && questions.length !== 0) {
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      ranking.push({ name, score, picture: img });
      ranking.sort((a, b) => b.score - a.score);
      const rankingString = JSON.stringify(ranking);
      // const rankingString = JSON.stringify([...ranking, { name, score, picture: img }]);
      localStorage.setItem('ranking', rankingString);
      return <Redirect to="/feedback" />;
    }

    return (
      <section>
        <Header />
        <Timer />
        <Questions />
      </section>
    );
  }
}

Play.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionPos: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  questionPos: state.game.questionPos,
  name: state.user.name,
  img: state.user.urlPicture,
  score: state.game.score,
});

export default connect(mapStateToProps)(Play);
