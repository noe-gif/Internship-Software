import React from 'react';

import { Box, Typography } from '@mui/material';

import { formatDateToHHmm } from 'src/utils/logic/date/formattedDate';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function TurnaroundDatetime(props) {
  const {
    styledClass,
    color,
    datetime,
    id,
  } = props;

  const { state: { selectedTimezone } } = useTimezoneFilter();

  if (datetime) {
    return (
      <Typography
        id={id}
        variant="body2"
        color={color}
        component="p"
        className={styledClass}
      >
        {formatDateToHHmm(datetime, selectedTimezone)}
      </Typography>
    );
  } else {
    return <Box />;
  }
}
