import { reporters } from 'mocha';
import Timer from '../components/Timer'
import React from 'react';
import { connect } from 'react-redux';
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta, onStop } from 'react-countdown';

import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { contador } from '../actions';

class Perguntas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: '',
      position: 0,
      options: '',
      shouldRedirect: false,
      right: '',
      wrong: '',
      hide: true,
      renderize:false,
      timer:30,
      paused:true

 
    };
    this.hundleButton = this.hundleButton.bind(this);
  }
  

  tick = () => {
    const {timer} = this.state
    if(timer !== 0)
  	this.setState({ timer : this.state.timer - 1 });
  }

  startTimer = () =>{
const {timer} = this.state
    this.interval = setInterval(this.tick,1000);
    this.setState({ paused : false });
    if(!timer) {
      this.setState({
        hide:false 
      })
    }
	}

  reset = () => {
  	this.setState({ timer : 30, paused: true });
    clearInterval( this.interval );
  }

  stopTimer = () => {
  	clearInterval( this.interval );
    this.setState({ paused : true });
  }
 
  
  componentDidMount(){
    this.startTimer()
   
  }


  getPerguntas(position) {
    console.log('chamou o get')
    const { perguntasState } = this.props;
    const { right, wrong, timer } = this.state;

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
      const result = perguntasState !== undefined
    && <div>
      <p data-testid="question-category">{perguntasState.results[position].category}</p>
      <p data-testid="question-text">{perguntasState.results[position].question}</p>
      {alternativas.sort((a, b) => 0.5 - Math.random()).map((e) => (
        <div> 
        
          <button
            disabled={!timer ==!0 }
            type="button"
            className={ `null, ${e.correct === true ? right : wrong}` }
            onClick={ () => this.answersHandler(e, alternativas) }
          >
            {e.text}

          </button>
        
        </div>
      ))}
        </div>;
      return result;
    }
  }


  endOfthegame() {
    const { position, hide, timer } = this.state;
    const { perguntasState } = this.props;
    const alternativas = perguntasState.results[position].incorrect_answers.map((e, index) => ({
      correct: false,
      text: e,
      datatestid: `wrong-answer-${index}`,
    }));
    console.log(alternativas.length);
    alternativas.push({
      correct: true,
      text: perguntasState.results[position].correct_answer,
      datatestid: 'correct-answer',

    });
    if (alternativas.length > position) {
      this.setState({ position: position + 1,
        right: '',
        wrong: '',
        hide: true,
      });

      
      
    } else {
      this.setState({
        shouldRedirect: true,
      });
    }
  }

  answersHandler(e, alternativas) {
    let {timer} = this.state
    console.log(e);
    this.stopTimer()
    if (e.correct === true ) {
      this.setState({
        right: 'right-answer',
        wrong: 'wrong-answer',
        hide: false,
      
      });
    }
    this.setState({
      right: 'right-answer',
      wrong: 'wrong-answer',
      hide: false,
    });
  }



  hundleButton() {
    this.endOfthegame();
    this.reset()
    this.startTimer()
    }

  render() {
    const { perguntasState, loadingState, times } = this.props;
    const { position, options, shouldRedirect, hide, timer, paused } = this.state;
    console.log(timer)
    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }

 
    return (
      <div> 
          {/* <Countdown date={Date.now() + 30000} */}
              {/* />, */}
              {timer}
        {this.getPerguntas(position) }
        <button data-testid="btn-next" className={ `null, ${hide   ?  'hidden' : 'null' } ` }    onClick={ () => this.hundleButton() }>Próximo</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  times: (timer, countof) => dispatch(contador(timer, countof)),
});
const mapStateToProps = (state) => ({
  perguntasState: state.perguntaReducers.pergunta,
  loadingState: state.perguntaReducers.loading,
  time: state.timere.timer
});
export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
