import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import TurnaroundDatetime from 'src/components/turnaround/turnaroundDatetime';

import departureInfosFromFlight from 'src/utils/logic/flight/departureInfosFromFlight';

import { useStyles } from 'src/components/turnaround/styleTurnaround';

export default function DepartureTime(props) {
  const {
    allDoorsClosedTargetDateTime,
    departureFlight,
    turnaroundId,
    turnaroundStatus,
  } = props;

  const classes = useStyles();

  const flightDepartureDateTimeInfos = departureInfosFromFlight(
    allDoorsClosedTargetDateTime,
    departureFlight,
    turnaroundStatus.category,
  );

  return (
    <Grid container>
      <Box className={classes.bottomTime}>
        <Grid item xs={6} className={classes.bottomInformation}>
          <Typography
            id={`departureTimeText${turnaroundId}`}
            className={classes.bottomTimeSmall}
            variant="body1"
            color={flightDepartureDateTimeInfos.departureTimeTextColor}
            component="p"
          >
            {`${flightDepartureDateTimeInfos.departureTimeText}`}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.bottomInformation}>
          <TurnaroundDatetime
            id={`departureTimeContent${turnaroundId}`}
            styledClass={classes.bottomTimingSmall}
            color={flightDepartureDateTimeInfos.departureTimeContentColor}
            datetime={flightDepartureDateTimeInfos.departureTimeContent}
          />
        </Grid>
      </Box>
    </Grid>
  );
}
