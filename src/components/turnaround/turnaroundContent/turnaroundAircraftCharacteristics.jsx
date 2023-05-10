import React from 'react';

import { Grid } from '@mui/material';

import Aircraft from 'src/components/turnaround/aircraft';
import AirlineLogo from 'src/components/turnaround/airlineLogo';
import TailNumber from 'src/components/turnaround/tailNumber';

import ParkingStand from 'src/components/flight/parkingStand';

export default function turnaroundAircraftCharacteristics(props) {
  const {
    aircraftCharacteristics,
    arrivalFlight,
    classes,
    departureFlight,
    turnaroundId,
    turnaroundStatus,
  } = props;

  return (
    <Grid className={classes.aircraftCharacteristicContainer} container>
      <Grid className={classes.topCardLineMiddleContainer} container>
        <ParkingStand
          parkingStand={arrivalFlight?.parking_stand_arrival}
          turnaroundId={turnaroundId}
          turnaroundStatus={turnaroundStatus}
          turnaroundType="Arrival"
        />
        <TailNumber
          tailNumber={aircraftCharacteristics.tailNumber}
          turnaroundId={turnaroundId}
        />
        <AirlineLogo
          className="turnaroundLogo"
          turnaroundCarrierCodes={aircraftCharacteristics.carrierCodes}
          turnaroundId={turnaroundId}
        />
        <Aircraft
          aircraftToRender={aircraftCharacteristics.aircraft}
          turnaroundId={turnaroundId}
        />
        <ParkingStand
          parkingStand={departureFlight?.parking_stand_departure}
          turnaroundId={turnaroundId}
          turnaroundStatus={turnaroundStatus}
          turnaroundType="Departure"
        />
      </Grid>
    </Grid>
  );
}
