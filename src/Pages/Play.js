import React from 'react';

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
      <div>Hello</div>
    );
  }
}

export default Play;
