import React, { useState } from 'react';
import { TextField } from '@mui/material';

import {
  FAIL, errorStatusMessage, SUCCESS,
} from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import DATE_PICKER_TEXT from 'src/constants/turnaroundDetail/turnaroundDetailTimingText.json';

import useStyles from 'src/styles/airportLocationStyle';

import 'src/styles/Modal.css';

export default function DatePicker(props) {
  const {
    dateTimingTriggerId,
    errorMessage,
    initialDateValue,
    initialTimingValue,
    onChangeDateToSend,
    responseStatus,
    showModal,
  } = props;

  const classes = useStyles();
  const [timing, setTiming] = useState(initialTimingValue);
  const [date, setDate] = useState(initialDateValue);

  const setTimingChange = (timingToSet) => {
    if (timingToSet === '') {
      setTiming('--:--');
    } else {
      setTiming(timingToSet);
    }
  };

  const setDateChange = (dateToSet) => {
    if (dateToSet === '') {
      setDate('yyyy-mm-dd');
    } else {
      setDate(dateToSet);
    }
  };

  const formatDate = () => {
    const formattedDate = {
      date,
      timing,
    };
    onChangeDateToSend(formattedDate, dateTimingTriggerId);
    return null;
  };

  const resetTimingData = () => {
    onChangeDateToSend({ date: '', timing: null }, dateTimingTriggerId);
  };

  const shouldDisplayModalTitle = () => (
    (dateTimingTriggerId !== 'start' && dateTimingTriggerId !== 'end')
  );

  return (
    <div className="modalEntitiesWrapper">
      <div className="contentModalWrapper">
        <div className="modalWrapper">
          <div className="modalContent">
            {shouldDisplayModalTitle() ? (
              <p
                id="datePickerName"
                className="fontSizeBig modalName"
              >
                {dateTimingTriggerId.toUpperCase()}
              </p>
            ) : (
              <p className="fontSizeBig modalName" />
            )}
            <div className={classes.container}>
              <TextField
                id={dateTimingTriggerId}
                type="date"
                onChange={(dateToSet) => setDateChange(dateToSet.target.value)}
                defaultValue={initialDateValue}
                className={classes.textField}
              />
              <TextField
                id={initialTimingValue}
                type="time"
                defaultValue={initialTimingValue}
                className={classes.textField}
                onChange={(timingToSet) => setTimingChange(timingToSet.target.value)}
              />
            </div>
            {(responseStatus.status === SUCCESS && errorMessage === '') && showModal(dateTimingTriggerId)}
            {(responseStatus.status === FAIL && errorMessage === '') && (
              <p
                id="datePickerErrorStatusMessage"
                className="modalStatusFail"
              >
                {errorStatusMessage[responseStatus.statusCode]}
              </p>
            )}
            {errorMessage !== '' && (
              <p className="modalStatusFail">{errorMessage}</p>
            )}
            <div className="modalButtonWrapper">
              <div
                onClick={() => showModal(dateTimingTriggerId)}
                role="button"
                aria-hidden="true"
                className="modalButtonContent modalButtonMarginBottom"
              >
                <p
                  id="datePickerCancelButton"
                  className="fontSizeDefault modalButton"
                >
                  {DATE_PICKER_TEXT.date_picker.cancel}
                </p>
              </div>
              <div
                onClick={() => resetTimingData()}
                role="button"
                aria-hidden="true"
                className="modalButtonContent modalButtonMarginBottom"
              >
                <p
                  id="datePickerResetButton"
                  className="fontSizeDefault modalButton"
                >
                  {DATE_PICKER_TEXT.date_picker.reset}
                </p>
              </div>
              <div
                onClick={() => { formatDate(); }}
                role="button"
                aria-hidden="true"
                className="modalButtonContent modalButtonMarginBottom"
              >
                <p
                  id="datePickerConfirmButton"
                  className="fontSizeDefault modalButton"
                >
                  {DATE_PICKER_TEXT.date_picker.confirm}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
