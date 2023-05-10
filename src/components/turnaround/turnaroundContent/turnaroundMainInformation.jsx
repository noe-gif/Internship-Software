import React from 'react';

import {
  Grid,
} from '@mui/material';

import TurnaroundAircraftCharacteristics from
  'src/components/turnaround/turnaroundContent/turnaroundAircraftCharacteristics';
import TurnaroundTimings from 'src/components/turnaround/turnaroundContent/turnaroundTimings';

import { extractAircraftCharacteristicsFromTurnaround } from 'src/utils/parsing/extractFromTurnaround';

import {
  TURNAROUND_INFORMATION_LARGE,
  TURNAROUND_INFORMATION_SMALL,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function TurnaroundMainInformation(props) {
  const {
    classes,
    iconSize,
    isSmall,
    turnaround,
  } = props;

  return (
    <Grid
      item
      xs={isSmall ? TURNAROUND_INFORMATION_SMALL : TURNAROUND_INFORMATION_LARGE}
      lg={TURNAROUND_INFORMATION_SMALL}
      className={classes.contentVertical}
    >
      <TurnaroundAircraftCharacteristics
        aircraftCharacteristics={extractAircraftCharacteristicsFromTurnaround(turnaround)}
        arrivalFlight={turnaround?.arrival_flight}
        classes={classes}
        departureFlight={turnaround?.departure_flight}
        turnaroundId={turnaround.id}
        turnaroundStatus={turnaround.status.category}
      />
      <hr className="horizontalBar" />
      <TurnaroundTimings
        classes={classes}
        iconSize={iconSize}
        isSmall={isSmall}
        turnaround={turnaround}
      />
    </Grid>
  );
}
