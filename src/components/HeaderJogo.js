import React from 'react';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderJogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreView: 0,
    };

    this.viewr = this.viewr.bind(this);
  }

  componentDidMount() {
    // const { score } = JSON.parse(localStorage.getItem('player'));
    const { score } = this.props;
    console.log(score);
    this.viewr(score);
  }

  viewr(scoreAtt) {
    this.setState({ scoreView: scoreAtt });
  }

  createHash() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email);
    const result = hash.toString();
    return result;
  }

  render() {
    const hash = this.createHash();
    const { scoreView } = this.state;
    const { name } = JSON.parse(localStorage.getItem('player'));
    return (
      <header>
        <div>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="teste" />
        </div>
        <div>
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <div>
          <span data-testid="header-score">{ scoreView }</span>
        </div>
      </header>
    );
  }
}

HeaderJogo.propTypes = {
  email: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
  name: user.name,
  score: user.score,
});

export default connect(mapStateToProps)(HeaderJogo);
