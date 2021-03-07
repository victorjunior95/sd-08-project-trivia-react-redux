import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <NavLink
          to="/"
        >
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </NavLink>
      </div>
    );
  }
}
