import React from 'react';
import { connect } from 'react-redux';
import actionss from '../Actions/index';
import TelaFeedback from '../Components/TelaFeedback';

class Jogo extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { reqPerguntas } = this.props;
    const token = localStorage.getItem('token');
    reqPerguntas(token);
  }

  render() {
    const { perguntas } = this.props;
    const array = perguntas[0];
    console.log(array);
    return (<>
      <TelaFeedback />
      {array ? <div>
        {array.map(({ question, category }) => (
          <div>
            <h1>{category}</h1>
            <p>{question}</p>
          </div>
        ))}
               </div> : <p>Carregando...</p>}
            </>
    );
  }
}
const mapStateToProps = (state) => ({
  perguntas: state.reqApiReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  reqPerguntas: (token) => dispatch(actionss(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
