import React from 'react';
import DefaultButton from './DefaultButton';

const OptionButtons = (props) => {

  const { options } = props;

  return (

    {
      options.map(e => {
        return (
          <DefaultButton>
          </DefaultButton>
        );
      })
    }

  );
}