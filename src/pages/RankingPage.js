import React from 'react';
import ButtonReturnToLogin from '../components/ButtonReturnToLogin';

export default class RankingPage extends React.Component {
  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Rankings
        </h1>
        <ButtonReturnToLogin testIdName="btn-go-home" />
      </div>
    );
  }
}
