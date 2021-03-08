import React from 'react';

class CardPlayer extends React.Component {
  render() {
    const { el: item, index } = this.props;
    console.log(item);
    return (
      <div>
        <div>
          <span data-testid={ `player-name-${index}` }>{ item.name }</span>
        </div>
        <div>
          <span data-testid={ `player-score-${index}` }>{ item.score}</span>
        </div>
        <div>
          <img src={ item.picture } alt={ item.name } />
        </div>
      </div>
    );
  }
}

export default CardPlayer;
