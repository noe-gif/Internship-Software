import React from 'react';

import {
  Grid,
} from '@mui/material';

import DepartureFlight from 'src/components/flight/departureFlight';

import {
  FLIGHT_INFORMATION_LARGE,
  FLIGHT_INFORMATION_SMALL,
  FLIGHT_LARGE_ICON_MARGIN,
  FLIGHT_SMALL_ICON_MARGIN,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function TurnaroundDepartureFlight(props) {
  const {
    classes,
    departureFlight,
    iconSize,
    isSmall,
    turnaroundDate,
    turnaroundId,
    turnaroundStatus,
  } = props;

  return (
    <Grid
      item
      xs={isSmall ? FLIGHT_INFORMATION_SMALL : FLIGHT_INFORMATION_LARGE}
      lg={FLIGHT_INFORMATION_SMALL}
      mx={FLIGHT_INFORMATION_SMALL}
      className={classes.flightInformation}
    >
      {departureFlight && (
        <DepartureFlight
          departureFlight={departureFlight}
          iconSize={iconSize}
          isSmall={isSmall}
          marginBottomIcon={isSmall ? FLIGHT_SMALL_ICON_MARGIN : FLIGHT_LARGE_ICON_MARGIN}
          turnaroundDate={turnaroundDate}
          turnaroundId={turnaroundId}
          turnaroundStatus={turnaroundStatus}
        />
      )}
    </Grid>
  );
}
