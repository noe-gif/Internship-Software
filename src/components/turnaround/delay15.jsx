import React from 'react';

import { Box } from '@mui/material';

import {
  notValidDelay15Color,
  isDelay15,
  getDelay15Color,
} from '../../utils/logic/turnaround/isDelay15';

import { RedTypography, GreenTypography } from './styleTurnaround';

export default function Delay15(props) {
  const { turnaroundData } = props;

  const checkDelay15 = isDelay15(turnaroundData?.departure_flight);

  if (checkDelay15) {
    const delay15Color = getDelay15Color(turnaroundData?.departure_flight);

    if (delay15Color === notValidDelay15Color) {
      return (
        <RedTypography variant="body2" component="p">
          D15
        </RedTypography>
      );
    } else {
      return (
        <GreenTypography variant="body2" component="p">
          D15
        </GreenTypography>
      );
    }
  } else {
    return <Box />;
  }
}
