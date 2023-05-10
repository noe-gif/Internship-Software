import React from 'react';
import { Typography } from '@mui/material';

export default function TailNumber(props) {
  const {
    tailNumber,
    turnaroundId,
  } = props;

  const tailNumberStyle = {
    minWidth: '47px',
    fontSize: '1vw',
  };

  return (
    <Typography
      id={`turnaroundTailNumber${turnaroundId}`}
      style={tailNumberStyle}
      variant="body1"
      display="inline-block"
      color="primary"
      component="p"
    >
      {tailNumber}
    </Typography>
  );
}
