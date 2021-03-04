import React from 'react';
import { connect } from 'react-redux';

class Perguntas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      results: '',
      position: 0,
    };

    this.hundleButton = this.hundleButton.bind(this);
  }

  getPerguntas(position) {
    const { perguntasState } = this.props;
    if (perguntasState) {
      const alternativas = perguntasState.results[position].incorrect_answers.map((e, index) => ({
        correct: false,
        text: e,
        datatestid: `wrong-answer-${index}`,
      }));
      alternativas.push({
        correct: true,
        text: perguntasState.results[position].correct_answer,
        datatestid: 'correct-answer',
      });
      console.log(alternativas);
      const result = perguntasState !== undefined

    && <div>

      <p data-testid="question-category">{perguntasState.results[position].category}</p>
      <p data-testid="question-text">{perguntasState.results[position].question}</p>
      {alternativas.sort((a, b) => 0.5 - Math.random()).map((e) => (
        <div>
          <button>{e.text}</button>
        </div>
      ))}
    </div>;
      return result;
    }
  }

  hundleButton() {
    const { position } = this.state;
    this.setState({ position: position + 1 });
  }

  render() {
    const { perguntasState, loadingState } = this.props;
    const { position } = this.state;
    return (
      <div>
        {this.getPerguntas(position)}
        <button onClick={ this.hundleButton }>Próximo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntasState: state.perguntaReducers.pergunta,
  loadingState: state.perguntaReducers.loading,
});

export default connect(mapStateToProps, null)(Perguntas);
