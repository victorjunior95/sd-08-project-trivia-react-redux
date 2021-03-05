import React from 'react';
import { Link } from 'react-router-dom';

export const SettingButton = () => (
  <Link to="/settings">
    <button
      data-testid="btn-settings"
      type="button"
    >
      Setting
    </button>
  </Link>
);
