import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor() {
    super();
    this.convertEmail = this.createImage.bind(this);
  }

  createImage() {
    const user = md5().toString();
    const hash = `https://www.gravatar.com/avatar/${user}`;
    return hash;
  }

  render() {
    const { name } = this.props;
    console.log(name);

    return (
      <header>
        <div>
          <img
            src={ this.createImage() }
            alt="userimage"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">
            Usuário:
            <span>{name}</span>
          </p>
          <p data-testid="header-score">
            Placar:
            <span>{}</span>
          </p>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.reducerUser.name,
});

export default connect(mapStateToProps)(Feedback);
