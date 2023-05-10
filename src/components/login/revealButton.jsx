import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  HIDE_EYE_BUTTON_CLASSNAME,
  DISPLAY_EYE_BUTTON_CLASSNAME,
} from 'src/constants/login/revealButton';

export default function RevealButton(props) {
  const {
    isRevealed,
    password,
    revealPassword,
    setRevealPassword,
  } = props;

  return (
    isRevealed
      ? (
        <VisibilityOffIcon
          type="button"
          onClick={() => setRevealPassword(!revealPassword)}
          className={password ? DISPLAY_EYE_BUTTON_CLASSNAME : HIDE_EYE_BUTTON_CLASSNAME}
        />
      )
      : (
        <VisibilityIcon
          hidden={!password}
          type="button"
          onClick={() => setRevealPassword(!revealPassword)}
          className={password ? DISPLAY_EYE_BUTTON_CLASSNAME : HIDE_EYE_BUTTON_CLASSNAME}
        />
      )
  );
}
