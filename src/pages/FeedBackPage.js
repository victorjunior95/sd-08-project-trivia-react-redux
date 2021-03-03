import React from 'react';
import { FeedBackHeader, FeedBackMessage } from '../components';

export default class FeedBackPage extends React.Component {
  render() {
    return (
      <section>
        <FeedBackHeader />
        <FeedBackMessage />
      </section>);
  }
}
