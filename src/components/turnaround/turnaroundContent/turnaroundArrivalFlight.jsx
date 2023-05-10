import React from 'react';

import {
  Grid,
} from '@mui/material';

import ArrivalFlight from 'src/components/flight/arrivalFlight';

import {
  FLIGHT_INFORMATION_LARGE,
  FLIGHT_INFORMATION_SMALL,
  FLIGHT_LARGE_ICON_MARGIN,
  FLIGHT_SMALL_ICON_MARGIN,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function TurnaroundArrivalFlight(props) {
  const {
    arrivalFlight,
    classes,
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
      {arrivalFlight && (
        <ArrivalFlight
          arrivalFlight={arrivalFlight}
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
