import React, { useEffect } from 'react';
import {
  Box,
  CardContent,
  CardMedia,
} from '@mui/material';

import { useStyles } from 'src/components/turnaround/styleTurnaround';
import FlightAirport from 'src/components/flight/flightAirport';
import FlightCompleteNumber from 'src/components/flight/flightCompleteNumber';

import { ICON_IMAGE_PATH, TARMAC_STATIC_URL } from 'src/utils/urlAPIs';
import formatFlightNumber from 'src/utils/logic/turnaround/formatFlightNumber';

import arrivalFlightHook from 'src/hooks/flight/arrivalFlightHook';

const LANDING_PLANE_ICON = `${TARMAC_STATIC_URL}${ICON_IMAGE_PATH}LANDING_PLANE_ICON`;

export default function ArrivalFlight(props) {
  const {
    arrivalFlight,
    iconSize,
    isSmall,
    marginBottomIcon,
    turnaroundDate,
    turnaroundId,
    turnaroundStatus,
  } = props;

  const classes = useStyles();

  const {
    arrivalIcon,
    fontArrivalFlight,
    hasAirportIataCode,
    hasCompleteFlightNumber,
    refreshArrivalDisplay,
    selectedTimezone,
  } = arrivalFlightHook(arrivalFlight, turnaroundStatus, turnaroundDate);

  useEffect(() => {
    refreshArrivalDisplay();
  }, [arrivalFlight, selectedTimezone]);

  return (
    <Box className={isSmall ? classes.arrivalFlightBlockSmall : classes.arrivalFlightBlock}>
      <CardContent className={classes.arrivalFlightNumber}>
        {hasCompleteFlightNumber() && (
          <FlightCompleteNumber
            classes={classes}
            id={`turnaroundArrivalFlightNumber${turnaroundId}`}
            isSmall={isSmall}
            completeFlightNumber={formatFlightNumber(arrivalFlight)}
            labelFont={fontArrivalFlight}
          />
        )}
        {hasAirportIataCode() && (
          <FlightAirport
            className={classes.arrivalFlightNumberText}
            id={`turnaroundArrivalFlightAirport${turnaroundId}`}
            airportLabel={arrivalFlight.departure_airport.iata_code}
          />
        )}
      </CardContent>
      <Box className={classes.flightIcon} style={{ marginBottom: marginBottomIcon }}>
        <CardMedia
          component="img"
          alt="icon_landing"
          className={classes.icons}
          style={{ height: iconSize, width: iconSize }}
          image={`${LANDING_PLANE_ICON}${arrivalIcon}.png`}
        />
      </Box>
    </Box>
  );
}
