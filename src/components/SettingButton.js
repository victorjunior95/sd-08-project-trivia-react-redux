import React from 'react'
import { Link } from 'react-router-dom'

export const SettingButton =() => {
    return(
<Link to="/settings">
<button 
  data-testid="btn-settings"
  type="button"
//   onClick={ }
>
  Setting
</button>
</Link>
    )}