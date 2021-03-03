import React from 'react';

export const DefaultButton = (props) => {
  const { reqAttributes, btnText, name } = props;
  return (
    <button
      type="button"
      data-testid={ reqAttributes }
      name={ name }
    >
      {btnText}
    </button>
  );
}