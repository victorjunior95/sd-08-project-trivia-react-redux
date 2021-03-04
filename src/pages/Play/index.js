import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';

class Play extends React.Component {

  ramdomizeAnswers() {
    const positions = []
    positions.push(Math.round(Math.random() * 4))
    while (positions.length < 4) {
      let number = Math.round(Math.random() * 3);
      if (!positions.includes(number)) {
        positions.push(number);
      }
    }
    return positions
  }

  createMultipleQuestions = () => {
    const { data } = this.props;

    /* [{ content:"512MB", status: "correct-answers" },
    { content:"5GB", status: "incorrect-answers" }] */

    const incorrectAnswers = data.results[0].incorrect_answer.map( incorrectAnswer => ({
      content: incorrectAnswer,
      status: "incorrect-answers"
    }));

    const correctAnswer = {content: data.results[0].correct_answer, status: "correct-answer" }
    
    const allAnswers = [...incorrectAnswers, correctAnswer]
    
    const positions = this.ramdomizeAnswers()
    return (
      <div>
        <button data-testid={allAnswers[positions[0].status]} >{allAnswers[positions[0].content]}</button>
        <button data-testid={allAnswers[positions[1].status]}>{allAnswers[positions[1].content]}</button>
        <button data-testid={allAnswers[positions[2].status]}>{allAnswers[positions[2].content]}</button>
        <button data-testid={allAnswers[positions[3].status]}>{allAnswers[positions[3].content]}</button>
      </div>
    )
  }

  renderType = () => {
    const { data } = this.props;
    if (data.results[0].type === "multiple") {
      return (
        this.createMultipleQuestions()
      )
    } else {
      return (
        <div>
          <button>Verdadeiro</button>
          <button>Falso</button>
        </div>
      )
    }
  }

  renderQuestions = () => {
    const { data, isFetching } = this.props;

    if (isFetching !== true) {
      return (
        <div className="container">
          <span data-testid="question-category">{data.results[0].category}</span>
          <div className="container-questions-answers">
            <div className="questions">
              <p data-testid="question-text">pergunta aqui</p>
            </div>
            <div className="answers" />
          </div>
          <div className="container-timer-button">
            <div className="timer" />
            <div className="container-button">
            {this.renderType()}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }

  render() {
    //const { data } = this.props;
    // console.log(data.results[0].category);
    return (
      <div>
        <Header />
        {this.renderQuestions()}
        {/* <div className="container">
          <span data-testid="question-category">{data.results[1].category}</span>
          <div className="container-questions-answers">
            <div className="questions">
              <p data-testid="question-text">pergunta aqui</p>
            </div>
            <div className="answers" />
          </div>
          <div className="container-timer-button">
            <div className="timer" />
            <div className="container-button">
              <button type="button" />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.questions.data,
  isFetching: state.questions.isFetching
});

export default connect(mapStateToProps)(Play);

//   getToken().then(({ token }) => getQuestions(5, token).then((data) => console.log(data)));
/* 
[{1:{ content:"512MB", status: "correct-answers" }},
{2:{ content:"5GB", status: "incorrect-answers" }]


console.log(positions); */






