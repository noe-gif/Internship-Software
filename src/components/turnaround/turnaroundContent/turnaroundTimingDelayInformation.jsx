import React from 'react';

import {
  Box, Grid,
} from '@mui/material';

import DelayCode from 'src/components/turnaround/delayCode';
import TurnaroundTimingStatusIcon from 'src/components/turnaround/turnaroundContent/turnaroundTimingStatusIcon';

import { COMPLETED } from 'src/types/FlightStatus';

import {
  TURNAROUND_ALERT_SMALL,
  TURNAROUND_ALERT_LARGE,
} from 'src/constants/turnaround/turnaroundContent/turnaroundContentConstant';

export default function TurnaroundTimingDelayInformation(props) {
  const {
    classes,
    departureFlight,
    isSmall,
    turnaroundDelays,
    turnaroundId,
    turnaroundStatus,
  } = props;

  const renderDelayCode = () => (
    turnaroundStatus.category === COMPLETED && <DelayCode delays={turnaroundDelays} />
  );

  return (
    <Grid
      item
      xs={isSmall ? TURNAROUND_ALERT_SMALL : TURNAROUND_ALERT_LARGE}
      xl={TURNAROUND_ALERT_SMALL}
    >
      <Box className={classes.bottomCardLineMiddle}>
        <TurnaroundTimingStatusIcon
          departureFlight={departureFlight}
          isSmall={isSmall}
          turnaroundId={turnaroundId}
          turnaroundStatusCategory={turnaroundStatus.category}
        />
        {renderDelayCode()}
      </Box>
    </Grid>
  );
}
