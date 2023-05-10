import React from 'react';

import { Typography } from '@mui/material';

export default function Aircraft(props) {
  const {
    aircraftToRender,
    turnaroundId,
  } = props;

  const aircraftIcaoCodeStyle = {
    fontSize: '1vmax',
    marginLeft: '0.6vmax',
  };

  return (
    <Typography
      id={`turnaroundAircraft${turnaroundId}`}
      variant="body1"
      color="primary"
      component="p"
      className="aircraftText"
      style={aircraftIcaoCodeStyle}
    >
      {aircraftToRender}
    </Typography>
  );
}
