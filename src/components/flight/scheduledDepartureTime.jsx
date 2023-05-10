import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import TurnaroundDatetime from 'src/components/turnaround/turnaroundDatetime';
import { useStyles } from 'src/components/turnaround/styleTurnaround';

import scheduledDepartureTimeHook from 'src/hooks/flight/scheduledDepartureTimeHook';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

export default function ScheduledDepartureTime(props) {
  const {
    departureFlightId,
    departureFlightRescheduledDatetime,
    departureFlightScheduledDatetime,
  } = props;

  const classes = useStyles();

  const {
    getScheduledDepartureDatetimeContent,
    getScheduledDepartureDatetimeText,
  } = scheduledDepartureTimeHook(departureFlightRescheduledDatetime, departureFlightScheduledDatetime);

  return (
    <Grid container>
      <Box className={classes.bottomTime}>
        <Grid item xs={6} className={classes.bottomInformation}>
          <Typography
            id={`scheduledDepartureTimeText${departureFlightId}`}
            className={classes.bottomTimeSmall}
            variant="body1"
            color="primary"
            component="p"
          >
            {getScheduledDepartureDatetimeText(
              TIMING_ACRONYMS.departure_text.rescheduled_time_departure,
              TIMING_ACRONYMS.departure_text.scheduled_time_departure,
            )}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.bottomInformation}>
          <TurnaroundDatetime
            id={`scheduledDepartureTimeContent${departureFlightId}`}
            styledClass={classes.bottomTimingSmall}
            color="primary"
            datetime={getScheduledDepartureDatetimeContent(
              departureFlightRescheduledDatetime,
              departureFlightScheduledDatetime,
            )}
          />
        </Grid>
      </Box>
    </Grid>
  );
}
