import React from 'react';

import {
  Grid,
} from '@mui/material';

import ArrivalTime from 'src/components/flight/arrivalTime';
import ScheduledArrivalTime from 'src/components/flight/scheduledArrivalTime';
import {
  FLIGHT_TIMING_CONTAINER_LARGE,
  FLIGHT_TIMING_CONTAINER_SMALL,
  FLIGHT_TIMING_LARGE,
  FLIGHT_TIMING_SMALL,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function TurnaroundArrivalFlightTiming(props) {
  const {
    arrivalFlight,
    classes,
    isSmall,
    turnaroundId,
    turnaroundStatus,
  } = props;

  return (
    <Grid
      className={classes.bottomCardLineStart}
      item
      xs={isSmall ? FLIGHT_TIMING_CONTAINER_SMALL : FLIGHT_TIMING_CONTAINER_LARGE}
      xl={FLIGHT_TIMING_CONTAINER_SMALL}
    >
      <Grid container>
        <Grid item xs={FLIGHT_TIMING_SMALL} lg={isSmall ? FLIGHT_TIMING_SMALL : FLIGHT_TIMING_LARGE}>
          {arrivalFlight && (
            <ScheduledArrivalTime
              arrivalFlightId={arrivalFlight.id}
              arrivalFlightRescheduledDatetime={arrivalFlight.rescheduled_time_arrival_datetime}
              arrivalFlightScheduledDatetime={arrivalFlight.scheduled_time_arrival_datetime}
            />
          )}
        </Grid>
        <Grid item xs={FLIGHT_TIMING_SMALL} lg={isSmall ? FLIGHT_TIMING_SMALL : FLIGHT_TIMING_LARGE}>
          <ArrivalTime
            arrivalFlight={arrivalFlight}
            turnaroundId={turnaroundId}
            turnaroundStatus={turnaroundStatus}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
