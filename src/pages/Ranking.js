import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
    constructor()  {
        super()
        this.state = {
            player: {
                name:"",
                assertions:"",
                score:"",
                gravatarEmail:"",
            },

            ranking:{
                name:"", 
                score:"",
                picture:"", 
            }, 
            
        }
    }

    componentDidMount(){
        this.savePlayer()
        this.saveRanking()
    }


     savePlayer() {
        const {name, email} = this.props

        this.setState({
            player: {
                name:name,
                assertions:"",
                score:"",
                gravatarEmail:email,
            }
            

        }, () => {  
            localStorage.setItem('player', JSON.stringify(this.state.player));

        } )
        
        console.log(name)
      }


    saveRanking() {
        const {name, email} = this.props

        this.setState({
            ranking:{
                name:name, 
                score:"",
                picture:email, 
            }


        }, () => {  
            localStorage.setItem('ranking', JSON.stringify([this.state.ranking]));

        } )
        
        console.log(name)
      }



    
    
    

    render(){
        const {name, email} = this.props
        return (
            <div>
                <h1 data-testid="ranking-title">Ranking</h1>
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
            <Link to="/" >
            <button data-testid="btn-go-home"> Voltar ao Inicio </button>
            <Link to="/" >
            <button data-testid="btn-play-again">Jogar novamente </button>
            </Link>
            </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    email: state.login.email,
    name: state.login.name,

  })
export default connect(mapStateToProps)(Ranking)