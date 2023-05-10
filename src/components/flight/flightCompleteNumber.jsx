import React from 'react';

import {
  Typography,
} from '@mui/material';

export default function FlightCompleteNumber(props) {
  const {
    classes,
    id,
    isSmall,
    completeFlightNumber,
    labelFont,
  } = props;

  return (
    <Typography
      id={id}
      display="inline-block"
      variant={labelFont}
      color="primary"
      component="p"
      className={isSmall ? classes.arrivalFlightNumberText : classes.arrivalFlightNumberTextLarge}
    >
      {completeFlightNumber}
    </Typography>
  );
}
