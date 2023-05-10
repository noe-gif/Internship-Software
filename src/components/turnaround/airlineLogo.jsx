import React from 'react';

import { Box, CardMedia } from '@mui/material';

import extractCarrierCodeFromTurnaroundCarrierCodes from
  'src/utils/logic/airline/extractCarrierCodeFromTurnaroundCarrierCodes';

import { useStyles } from 'src/components/turnaround/styleTurnaround';

import { CARRIER_LOGO_PATH } from 'src/constants/picturePath';

export default function AirlineLogo(props) {
  const {
    className,
    turnaroundCarrierCodes,
    turnaroundId,
  } = props;
  const classes = useStyles();

  const airlineLogo = extractCarrierCodeFromTurnaroundCarrierCodes(turnaroundCarrierCodes);

  return (
    <Box display="flex">
      {airlineLogo.map((item) => (
        <CardMedia
          key={`airlineLogo${turnaroundId}${item}`}
          component="img"
          alt="logo_airline"
          className={classes[className]}
          image={`${CARRIER_LOGO_PATH}${item}.png`}
        />
      ))}
    </Box>
  );
}
