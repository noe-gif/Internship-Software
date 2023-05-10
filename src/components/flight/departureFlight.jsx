import React, { useEffect } from 'react';

import { Box, CardContent } from '@mui/material';

import FlightAirport from 'src/components/flight/flightAirport';
import FlightCompleteNumber from 'src/components/flight/flightCompleteNumber';
import FlightIcon from 'src/components/flight/FlightIcon';

import formatFlightNumber from 'src/utils/logic/turnaround/formatFlightNumber';

import { useStyles } from 'src/components/turnaround/styleTurnaround';
import departureFlightHook from 'src/hooks/flight/departureFlightHook';

export default function DepartureFlight(props) {
  const {
    departureFlight,
    iconSize,
    isSmall,
    marginBottomIcon,
    turnaroundDate,
    turnaroundId,
    turnaroundStatus,
  } = props;

  const classes = useStyles();

  const {
    departureIcon,
    fontDepartureFlight,
    refreshDepartureDisplay,
    selectedTimezone,
  } = departureFlightHook(departureFlight, turnaroundDate, turnaroundStatus);

  useEffect(() => {
    refreshDepartureDisplay();
  }, [departureFlight, selectedTimezone]);

  return (
    <Box className={isSmall ? classes.departureFlightBlockSmall : classes.departureFlightBlock}>
      {!isSmall && (
        <FlightIcon
          departureIcon={departureIcon}
          classes={classes}
          marginBottomIcon={marginBottomIcon}
          iconSize={iconSize}
        />
      )}
      <div className={classes.departureFlightNumber}>
        <CardContent className={classes.contentVertical}>
          {departureFlight.carrier_code && departureFlight.flight_number && (
            <FlightCompleteNumber
              classes={classes}
              id={`turnaroundDepartureFlightNumber${turnaroundId}`}
              isSmall={isSmall}
              completeFlightNumber={formatFlightNumber(departureFlight)}
              labelFont={fontDepartureFlight}
            />
          )}
          {departureFlight.arrival_airport.iata_code && (
            <FlightAirport
              className={classes.departureFlightNumberText}
              id={`turnaroundDepartureFlightAirport${turnaroundId}`}
              airportLabel={departureFlight.arrival_airport.iata_code}
            />
          )}
        </CardContent>
      </div>
      {isSmall && (
        <FlightIcon
          departureIcon={departureIcon}
          classes={classes}
          marginBottomIcon={marginBottomIcon}
          iconSize={iconSize}
        />
      )}
    </Box>
  );
}
