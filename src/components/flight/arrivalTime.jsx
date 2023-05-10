import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { useStyles } from 'src/components/turnaround/styleTurnaround';
import TurnaroundDatetime from 'src/components/turnaround/turnaroundDatetime';

import arrivalInfoFromFlight from 'src/utils/logic/flight/arrivalInfoFromFlight';

export default function ArrivalTime(props) {
  const {
    arrivalFlight,
    turnaroundId,
    turnaroundStatus,
  } = props;

  const classes = useStyles();

  const flightArrivalDateTimeInfos = arrivalInfoFromFlight(
    arrivalFlight,
    turnaroundStatus.category,
  );

  return (
    <Grid container>
      <Box className={classes.bottomTime}>
        <Grid item xs={6} className={classes.bottomInformation}>
          <Typography
            id={`arrivalTimeText${turnaroundId}`}
            className={classes.bottomTimeSmall}
            variant="body1"
            color={flightArrivalDateTimeInfos.arrivalTimeTextColor}
            component="p"
          >
            {`${flightArrivalDateTimeInfos.arrivalTimeText}`}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.bottomInformation}>
          <TurnaroundDatetime
            id={`arrivalTimeContent${turnaroundId}`}
            styledClass={classes.bottomTimingSmall}
            color={flightArrivalDateTimeInfos.arrivalTimeContentColor}
            datetime={flightArrivalDateTimeInfos.arrivalTimeContent}
          />
        </Grid>
      </Box>
    </Grid>
  );
}
