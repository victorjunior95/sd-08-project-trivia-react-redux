import React from 'react'
import { connect } from 'react-redux';

class Ranking extends React.Component {
    constructor()  {
        super()
        this.state = {
            player: {
                name:"",
                assertions:"",
                score:"",
                gravatarEmail:"",
            }
        }
    }


    savePlayer() {
        const {name, email} = this.props

        this.setState({
            name:name,
            gravatarEmail:email,
            assertions:0,
            score:0,

        })
          localStorage.setItem('player', JSON.stringify(this.state));
        
        console.log(name)
      }

    render(){
        const {name, email} = this.props
        return (
            <div>
            <ul>
            <li>
            <img
            src={ `https://www.gravatar.com/avatar/${email}` }
            alt={ `Imagem de perfil do jogador: ${name}` }
            data-testid="header-profile-picture"
          />
            <p data-testid={"player-name-${index}"}> {`Jogador: ${name}`}</p>
             {/* <p data-testid={"player-score-${index}"}>{`Score: ${score.sort(function(a, b){return b-a}).toString()}`}</p> */}
            </li>    
            </ul>    

            <button onClick={this.savePlayer}> Show Ranking </button>
            </div>
        )
    }
}



 


const mapStateToProps = (state) => ({
    email: state.login.email,
    namee: state.login.name,
  })
export default connect (mapStateToProps)(Ranking)