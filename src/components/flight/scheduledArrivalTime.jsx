import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import TurnaroundDatetime from 'src/components/turnaround/turnaroundDatetime';
import { useStyles } from 'src/components/turnaround/styleTurnaround';

import TIMING_ACRONYMS from 'src/constants/timingAcronyms.json';

import scheduledArrivalTimeHook from 'src/hooks/flight/scheduledArrivalTimeHook';

export default function ScheduledArrivalTime(props) {
  const {
    arrivalFlightId,
    arrivalFlightRescheduledDatetime,
    arrivalFlightScheduledDatetime,
  } = props;

  const classes = useStyles();

  const {
    getScheduledArrivalDatetimeContent,
    getScheduledArrivalDatetimeText,
  } = scheduledArrivalTimeHook(arrivalFlightRescheduledDatetime, arrivalFlightScheduledDatetime);

  return (
    <Grid container>
      <Box className={classes.bottomTime}>
        <Grid item xs={6} className={classes.bottomInformation}>
          <Typography
            id={`scheduledArrivalTimeText${arrivalFlightId}`}
            className={classes.bottomTimeSmall}
            variant="body1"
            color="primary"
            component="p"
          >
            {getScheduledArrivalDatetimeText(
              TIMING_ACRONYMS.arrival_text.rescheduled_time_arrival,
              TIMING_ACRONYMS.arrival_text.scheduled_time_arrival,
            )}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.bottomInformation}>
          <TurnaroundDatetime
            id={`scheduledArrivalTimeContent${arrivalFlightId}`}
            styledClass={classes.bottomTimingSmall}
            color="primary"
            datetime={getScheduledArrivalDatetimeContent(
              arrivalFlightRescheduledDatetime,
              arrivalFlightScheduledDatetime,
            )}
          />
        </Grid>
      </Box>
    </Grid>
  );
}
