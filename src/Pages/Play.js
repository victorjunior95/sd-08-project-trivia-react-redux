import React from 'react';
import Header from '../Components/Header';

class Play extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  async componentDidMount() {
    const token = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => res.json());
    localStorage.setItem('token', token.token);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Play;
