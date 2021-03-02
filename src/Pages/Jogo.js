import React from 'react';
import { connect } from 'react-redux';
import actionss from '../Actions/index';

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

    return (
      <div>{array}</div>
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
