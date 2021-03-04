import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CardQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      ask: 0,
      disabled: false,
      color: false,
      answer: '',
      condicional: false,
    }
    this.onclick = this.onclick.bind(this);
  }

  onclick() {
    this.setState({ disabled: true });
  }

  render() {
    const { questionCard } = this.props;
    const { ask, disabled, answer, condicional } = this.state;
    return (
      <div>
        { questionCard.length > 0 &&
          <div>
            <h3 data-testid="question-category">{ questionCard[ask].category }</h3>
            <p data-testid="question-text">{ decodeURI(questionCard[ask].question) }</p>
            <div>
            { [ ...questionCard[ask].incorrect_answers,
                  questionCard[ask].correct_answer ]
                .map((element, index) => {
                  const dataId = () => element === questionCard[ask].correct_answer ?
                    "correct-answer" : `wrong-answer-${index}`;
                  return (
                    <button
                      type="button"
                      onClick={ (e) => { this.onclick();
                        this.setState({ answer: questionCard[ask].correct_answer, condicional: true })
                      } }
                      disabled={ disabled }
                      data-testid={ dataId() }
                      key={ element }
                      style={ condicional ?
                        element === answer ?
                          { border: '3px solid rgb(6, 240, 15)'}
                          : { border: '3px solid rgb(255, 0, 0)'}
                          : { border: null }}
                    >
                      { element }
                    </button>
                  );
                }).sort(() => Math.random() - 0.5)
              }
            </div>
              <button
              type="button"
              onClick={ () => this.setState({ ask: ask + 1,
                condicional: false, disabled: false }) }
              >
                Next
              </button>
          </div>
  }
  </div>
    )
}}


CardQuestions.propTypes = {
  questionCard: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) =>({
  questionCard: state.play.questions,
});

export default connect(mapStateToProps)(CardQuestions);
