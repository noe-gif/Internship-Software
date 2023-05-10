import React from 'react';

import { Grid } from '@mui/material';

import TurnaroundArrivalFlightTiming from 'src/components/turnaround/turnaroundContent/turnaroundArrivalFlightTiming';
import TurnaroundTimingDelayInformation from
  'src/components/turnaround/turnaroundContent/turnaroundTimingDelayInformation';
import TurnaroundDepartureFlightTiming from
  'src/components/turnaround/turnaroundContent/turnaroundDepartureFlightTiming';

export default function TurnaroundTimings(props) {
  const {
    classes,
    iconSize,
    isSmall,
    turnaround,
  } = props;

  return (
    <Grid className={classes.cardLineContainer} container>
      <TurnaroundArrivalFlightTiming
        arrivalFlight={turnaround.arrival_flight}
        classes={classes}
        isSmall={isSmall}
        turnaroundId={turnaround.id}
        turnaroundStatus={turnaround.status}
      />
      <TurnaroundTimingDelayInformation
        classes={classes}
        departureFlight={turnaround.departure_flight}
        iconSize={iconSize}
        isSmall={isSmall}
        turnaroundDelays={turnaround.delays}
        turnaroundId={turnaround.id}
        turnaroundStatus={turnaround.status}
      />
      <TurnaroundDepartureFlightTiming
        allDoorsClosedTargetDateTime={turnaround.all_doors_closed_target_datetime}
        classes={classes}
        departureFlight={turnaround.departure_flight}
        isSmall={isSmall}
        turnaroundId={turnaround.id}
        turnaroundStatus={turnaround.status}
      />
    </Grid>
  );
}
