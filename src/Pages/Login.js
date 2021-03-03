import React from 'react'



class Login extends React.Component {
  constructor() {
    super()
    this.saveToLocalStore = this.saveToLocalStore.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: '',
      gravatarEmail: '',
    }
  }

  saveToLocalStore = async () => {
    const estado = this.state
    const { history } = this.props.props
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const jsonObj = await fetchApi.json();
    const { token } = jsonObj;

    const objLocalStorage = {
      player: estado
    }

    localStorage.setItem('token', token)
    localStorage.setItem('state', JSON.stringify(objLocalStorage))

    history.push('/jogo')
  }
  handleChange(e) {
    const { name } = e.target
    this.setState({
      [name]: e.target.value
    })
  }



  render() {

    console.log(this.props.props)
    return (
      <div>
        <label>
          Nome:
          <input type='text' data-testid='input-player-name' name='name' onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type='text' data-testid='input-gravatar-email' name='gravatarEmail' onChange={this.handleChange} />
        </label>
        <button type='button' data-testid='btn-play' onClick={this.saveToLocalStore}>Jogar</button>
      </div>
    )
  }
}


export default Login