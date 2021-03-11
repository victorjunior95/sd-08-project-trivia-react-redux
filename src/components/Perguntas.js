import { reporters } from 'mocha';
import Timer from '../components/Timer'
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { contador, userAssertion, userLogin, userScore } from '../actions';

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
      timer:30,
      paused:true,
      tell:true,
      score:[],
      dificuldade:'',
      assert:[],
      state: {
      player:{
        name:"",
        assertions:"",
        score:"",
        gravatarEmail:"",
       } 
      },
 
    };
    this.hundleButton = this.hundleButton.bind(this);
  }
  

  tick = () => {
    const {timer, score} = this.state

    const {scorer} = this.props
    if(timer !== 0)
    this.setState({ timer : this.state.timer - 1 });
     if(timer <  30 && timer > 20) {
       this.setState({
         dificuldade:1
       })
   } 
    if (timer < 20 && timer > 10) {
      this.setState({
        dificuldade:2
      })
   } 
    if(timer < 10 && timer > 1) {
      this.setState({
        dificuldade:3
      })

    }
    

    if(timer === 0) {
      clearInterval( this.interval );
      this.setState({
        hide:false,
      })

    }  
  }

  startTimer = () =>{
const {timer} = this.state
    this.interval = setInterval(this.tick,1000);
    this.setState({ paused : false });

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
    const {timer} = this.state
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
      {alternativas.sort((a, b) => 0.5 - Math.random()).map((e, index) => (
        <div> 
        
          <button
            disabled={!timer ==!0 }
            type="button"
            className={ `null, ${e.correct === true ? right : wrong}` }
            onClick={ () => this.correctAnswerHandler(e, alternativas) }
            data-testid={ e.correct ? 'correct-answer' : `wrong-answer-${index}` }
          >
            {e.text}

          </button>
        
        </div>
      ))}
        </div>;
      return result;
    }
  }


 async endOfthegame() {
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

async storageHandle(){
 await  this.scoreHandler() 
 this.savePlayer()
}

async storageAssertionHandler(){
this.savePlayer()
}

  answersHandler(e, alternativas) {
    const {scorer} = this.props
    let {timer} = this.state
    console.log(timer)
    console.log(e);
    this.stopTimer()
    if (e.correct === true ) {
      this.setState({
        right: 'right-answer',
        wrong: 'wrong-answer',
        hide: false,
      
      });
       this.storageHandle()

    }

    this.setState({
      right: 'right-answer',
      wrong: 'wrong-answer',
      hide: false,
    });
    this.savePlayer()
  }


  hundleButton() {
    this.endOfthegame();
    this.reset()
    this.startTimer()
    }

    scoreHandler() {
      const {ScoreFunc, scoreState} = this.props

  const {timer, dificuldade, score, assertions} = this.state
      const TimeLeft = 30 -timer
      const soma = 10 + (TimeLeft) * (dificuldade)
      this.setState({ score: soma}, () => ScoreFunc((this.state.score)));
      this.assertionHandler()
    }

    assertionHandler(){
      const {AssertionFunc} = this.props
      const acertos = 1 
      this.setState({assert: acertos}, () => AssertionFunc(this.state.assert));
    }


    correctAnswerHandler(e){
      this.answersHandler(e)
      const {score} = this.state
    }
  
    savePlayer() {
      const {name, email, scoreState, scoreAssertions} = this.props
  
      this.setState({
        state:{
          player: {
              name:name,
              assertions:scoreAssertions.reduce(( accumulator, currentValue ) => accumulator + currentValue,0),
              score:scoreState.reduce(( accumulator, currentValue ) => accumulator + currentValue,0),
              gravatarEmail:email,
        }}
          
  
      }, () => {  
          localStorage.setItem('state', JSON.stringify(this.state.state));
          console.log(name)

      } )
      
    }
  

  render() {
    const { perguntasState, loadingState, times, scorer } = this.props;
    const { position, options, shouldRedirect, hide, timer, paused, dificuldade, score, assert } = this.state;
    // console.log(timer)
    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }
    console.log(score)
    console.log(assert)
    return (
      <div> 
              
              {timer}
        {this.getPerguntas(position) }
        <button data-testid="btn-next" className={ `null, ${hide   ?  'hidden' : 'null' } ` }    onClick={ () => this.hundleButton() }>Próximo</button>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ScoreFunc: (value) => dispatch(userScore(value)),
  AssertionFunc:(value) => dispatch(userAssertion(value))  
});
const mapStateToProps = (state) => ({
  perguntasState: state.perguntaReducers.pergunta,
  loadingState: state.perguntaReducers.loading,
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.assertionReducer.assertion
});


export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
