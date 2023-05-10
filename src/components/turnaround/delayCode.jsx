import React from 'react';
import { Box } from '@mui/material';

import { DELAY_CODE_SEPARATION_TEXT, DELAY_CODE_EMPTY_TEXT } from 'src/constants/turnaroundDetail/turnaroundDetail';

import { useStyles, RedTypography } from './styleTurnaround';

export default function DelayCode(props) {
  const { delays } = props;

  const classes = useStyles();

  const delayCodes = [];

  if (delays.length > 0) {
    for (let delayCounter = 0; delayCounter < delays.length; delayCounter += 1) {
      delayCodes.push(delays[delayCounter].code.toUpperCase());
    }
  }

  const renderDelayCode = (textElement, delayCode, className) => (
    <RedTypography className={className} key={delayCode.toString()} variant="body1" component="p">
      {`${textElement} ${delayCode}`}
    </RedTypography>
  );

  return (
    <Box display="flex" style={{ marginLeft: '4px' }}>
      {delayCodes.map((delayCode, index) => {
        if (index < 3) {
          if (index === 0) {
            return (renderDelayCode(DELAY_CODE_EMPTY_TEXT, delayCode, classes.delayCode));
          }
          return (renderDelayCode(DELAY_CODE_SEPARATION_TEXT, delayCode, classes.delayCode));
        }
        return null;
      })}
    </Box>
  );
}
