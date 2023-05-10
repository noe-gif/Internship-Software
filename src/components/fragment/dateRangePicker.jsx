import React, { useState } from 'react';

import { Box, ClickAwayListener, TextField } from '@mui/material';
import { DesktopDateRangePicker as DateRangePickerMui, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { isNewDateDifferentFromTheCurrentDate } from 'src/utils/logic/date/dateRangePicker';

import { formatDateToStringDDMMMYY } from 'src/utils/logic/date/formattedDate';

import { useStyleDateRangePicker } from 'src/components/filter/styleDateRangePickerFilter';

export default function DateRangePicker(props) {
  const { datePicked, onClickAwayFunction, setIsDatePickerOpen } = props;

  const classes = useStyleDateRangePicker();
  const [dateRange, setDateRange] = useState([datePicked[0], datePicked[1]]);
  const [hasNewDateChanged, setHasNewDateChanged] = useState(false);

  const onDateRangeChange = (newDateRange) => {
    if (isNewDateDifferentFromTheCurrentDate(
      newDateRange,
      dateRange,
      datePicked,
      hasNewDateChanged,
    )) {
      setDateRange([newDateRange[0], newDateRange[1]]);
      setHasNewDateChanged(false);
    } else {
      setHasNewDateChanged(true);
      setDateRange([newDateRange[0], newDateRange[0]]);
    }
  };

  const changeDateRangePickerDisplayedDate = (inputToChange) => {
    const inputWithNewDate = { ...inputToChange };

    inputWithNewDate.inputProps.value = formatDateToStringDDMMMYY(inputWithNewDate.inputProps.value);

    return inputWithNewDate;
  };

  return (
    <ClickAwayListener onClickAway={() => onClickAwayFunction(dateRange)}>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePickerMui
            startText="From"
            endText="To"
            calendars={1}
            value={dateRange}
            onOpen={() => setIsDatePickerOpen(true)}
            onChange={(newDateRange) => { onDateRangeChange(newDateRange); }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  {...changeDateRangePickerDisplayedDate(startProps)} // eslint-disable-line
                  classes={classes}
                />
                <Box sx={{ mx: 0.5 }} />
                <TextField
                  {...changeDateRangePickerDisplayedDate(endProps)} // eslint-disable-line
                  classes={classes}
                />
              </>
            )}
            disableAutoMonthSwitching
          />
        </LocalizationProvider>
      </div>
    </ClickAwayListener>
  );
}
