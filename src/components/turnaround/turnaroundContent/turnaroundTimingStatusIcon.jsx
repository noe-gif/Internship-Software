import React from 'react';

import { Box } from '@mui/material';

import getTurnaroundAlertIcons from 'src/utils/logic/turnaround/getTurnaroundAlertIcons';

import IconMedia from 'src/components/fragment/iconMedia';

import { IN_PROGRESS } from 'src/types/FlightStatus';

export default function TurnaroundTimingStatusIcon(props) {
  const {
    departureFlight,
    isSmall,
    turnaroundId,
    turnaroundStatusCategory,
  } = props;

  const turnaroundTimingStatusIcons = getTurnaroundAlertIcons(
    departureFlight,
    turnaroundStatusCategory,
  );

  if (turnaroundStatusCategory === IN_PROGRESS) {
    return (
      <Box display="flex">
        {turnaroundTimingStatusIcons.map((statusIcon) => (
          <IconMedia
            key={`alertIcon${turnaroundId}${statusIcon}`}
            isSmall={isSmall}
            iconToDisplay={statusIcon}
          />
        ))}
      </Box>
    );
  } else {
    return null;
  }
}
