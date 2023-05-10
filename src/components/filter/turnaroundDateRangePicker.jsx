import React, { useState } from 'react';

import DateRangePicker from 'src/components/fragment/dateRangePicker';

import 'src/styles/DateRangePicker.css';

export default function TurnaroundDateRangePicker(props) {
  const {
    airportPicked,
    datePicked,
    turnaroundRequestAction,
    userAccessToken,
  } = props;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleTurnaroundCall = (newDateRange) => {
    if (isDatePickerOpen) {
      turnaroundRequestAction(
        userAccessToken,
        newDateRange,
        airportPicked,
      );
      setIsDatePickerOpen(false);
    }
  };

  return (
    <>
      <DateRangePicker
        datePicked={datePicked}
        onClickAwayFunction={handleTurnaroundCall}
        setIsDatePickerOpen={setIsDatePickerOpen}
      />
    </>
  );
}
