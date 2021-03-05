import React from 'react';


class Feedback extends Component {
  render() {
   
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            alt=""
            src={ }
          />
          <div>
            <p data-testid="header-player-name">{ }</p>
          </div>
          <div>
            <p data-testid="header-score">{  }</p>
          </div>
        </header>
      </div>
    );
  }
}




export default Feedback;
