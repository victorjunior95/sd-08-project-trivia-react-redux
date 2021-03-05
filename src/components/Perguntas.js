import { reporters } from 'mocha';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class Perguntas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      results: '',
      position: 0,
      options: '',
      shouldRedirect: false
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
        correct:true,
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
          <button onClick={() => this.answersHandler(perguntasState)}>{e.text}</button>
        </div>
      ))}
    </div>;
    
      return result;
    }
  }

endOfthegame() {
  const { position } = this.state;
    const { perguntasState } = this.props;

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

    if(alternativas.length > position ){
      this.setState({ position: position + 1 });
    } else {
      this.setState({
        shouldRedirect: true 
      })
    }


}

  hundleButton() {
    this.endOfthegame()
    
  }

  render() {
    const { perguntasState, loadingState } = this.props;
    const { position, options, shouldRedirect} = this.state;
    if(shouldRedirect) {
      return <Redirect to="/" />
    }
    console.log(options)
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
