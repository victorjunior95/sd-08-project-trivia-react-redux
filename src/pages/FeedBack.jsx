import React from 'react';
import FeedbackMsg from '../components/FeedbackMsg';
import HeaderFeedBack from '../components/HeaderFeedBack';

export default class FeedBack extends React.Component {
// constructor(){
// super()

  // }
  render() {
    return (
      <div>
        <div>
          <HeaderFeedBack />
        </div>
        <FeedbackMsg />
      </div>
    );
  }
}
