import React from 'react';

import {
  Grid,
} from '@mui/material';

import DepartureTime from 'src/components/flight/departureTime';
import ScheduledDepartureTime from 'src/components/flight/scheduledDepartureTime';

import {
  FLIGHT_TIMING_CONTAINER_SMALL,
  FLIGHT_TIMING_CONTAINER_LARGE,
  FLIGHT_TIMING_LARGE,
  FLIGHT_TIMING_SMALL,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function TurnaroundDepartureFlightTiming(props) {
  const {
    allDoorsClosedTargetDateTime,
    classes,
    departureFlight,
    isSmall,
    turnaroundId,
    turnaroundStatus,
  } = props;

  return (
    <Grid
      className={classes.bottomCardLineEnd}
      item
      xs={isSmall ? FLIGHT_TIMING_CONTAINER_SMALL : FLIGHT_TIMING_CONTAINER_LARGE}
      xl={FLIGHT_TIMING_CONTAINER_SMALL}
    >
      <Grid container>
        <Grid item xs={FLIGHT_TIMING_SMALL} lg={isSmall ? FLIGHT_TIMING_SMALL : FLIGHT_TIMING_LARGE}>
          {departureFlight && (
            <ScheduledDepartureTime
              departureFlightId={departureFlight.id}
              departureFlightRescheduledDatetime={departureFlight.rescheduled_time_departure_datetime}
              departureFlightScheduledDatetime={departureFlight.scheduled_time_departure_datetime}
            />
          )}
        </Grid>
        <Grid item xs={FLIGHT_TIMING_SMALL} lg={isSmall ? FLIGHT_TIMING_SMALL : FLIGHT_TIMING_LARGE}>
          <DepartureTime
            allDoorsClosedTargetDateTime={allDoorsClosedTargetDateTime}
            departureFlight={departureFlight}
            turnaroundId={turnaroundId}
            turnaroundStatus={turnaroundStatus}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
