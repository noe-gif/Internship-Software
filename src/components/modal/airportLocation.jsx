import React, { useState } from 'react';
import { TextField } from '@mui/material';

import useStyles from 'src/styles/airportLocationStyle';

import {
  FAIL, SUCCESS,
} from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import {
  acronymModalSubTitle,
  acronymModalTitle,
  errorStatusMessage,
} from 'src/constants/turnaroundDetail/turnaroundDetailHeaderConstant';
import AIRPORT_LOCATION from 'src/constants/turnaroundDetail/turnaroundDetailHeaderText.json';

import 'src/styles/Modal.css';

export default function AirportLocation(props) {
  const {
    textTriggerType,
    errorMessage,
    initialTextValue,
    parkingStandToSend,
    responseStatus,
    showModal,
  } = props;

  const classes = useStyles();
  const [text, setText] = useState(initialTextValue !== AIRPORT_LOCATION.return_value.empty_quote
    ? initialTextValue.toUpperCase() : AIRPORT_LOCATION.return_value.empty_quote);

  const setTextChange = (textToSet) => {
    setText(textToSet.toUpperCase());
  };

  const updateArrivalAndDepartureParkingStand = () => {
    parkingStandToSend(text, textTriggerType, true);
  };

  const updateParkingStand = () => {
    parkingStandToSend(text, textTriggerType, false);
  };

  const resetParkingStand = () => {
    parkingStandToSend(null, textTriggerType, false);
  };

  return (
    <div className="modalEntitiesWrapper">
      <div className="contentModalWrapper">
        <div className="modalWrapper">
          <div className="modalContent">
            <p
              id="airportLocationName"
              className="fontSizeBig modalName"
            >
              {acronymModalTitle[textTriggerType]}
            </p>
            <p
              id="airportLocationSubTitle"
              className="fontSizeSmall modalSubTitle"
            >
              {acronymModalSubTitle[textTriggerType]}
            </p>
            <div className={classes.container}>
              <TextField
                id={`airportLocationTextField${textTriggerType}`}
                type="textarea"
                onChange={(textToSet) => setTextChange(textToSet.target.value)}
                value={text}
                className={classes.textField}
                placeholder={AIRPORT_LOCATION.airport_location.placeholder}
              />
            </div>
            {(responseStatus.status === SUCCESS && errorMessage === AIRPORT_LOCATION.return_value.empty_quote)
            && showModal(textTriggerType)}
            {(responseStatus.status === FAIL && errorMessage === AIRPORT_LOCATION.return_value.empty_quote) && (
              <p
                id="airportLocationErrorStatusMessage"
                className="modalStatusFail"
              >
                {errorStatusMessage[responseStatus.statusCode]}
              </p>
            )}
            {errorMessage !== AIRPORT_LOCATION.return_value.empty_quote && (
              <p className="modalStatusFail">{errorMessage}</p>
            )}
            <div className="modalButtonWrapper">
              <div
                onClick={() => showModal(textTriggerType)}
                role="button"
                aria-hidden="true"
                className="modalButtonContent"
              >
                <p
                  id="airportLocationCancelButton"
                  className="fontSizeDefault modalButton"
                >
                  {AIRPORT_LOCATION.airport_location.cancel}
                </p>
              </div>
              <div
                onClick={() => resetParkingStand()}
                role="button"
                aria-hidden="true"
                className="modalButtonContent"
              >
                <p
                  id="airportLocationResetButton"
                  className="fontSizeDefault modalButton"
                >
                  {AIRPORT_LOCATION.airport_location.reset}
                </p>
              </div>
              <div
                onClick={() => updateParkingStand()}
                role="button"
                aria-hidden="true"
                className="modalButtonContent"
              >
                <p
                  id="airportLocationConfirmButton"
                  className="fontSizeDefault modalButton"
                >
                  {AIRPORT_LOCATION.airport_location.confirm}
                </p>
              </div>
            </div>
            <div className="modalOnlyButtonWrapper">
              <div
                onClick={() => updateArrivalAndDepartureParkingStand()}
                role="button"
                aria-hidden="true"
                className="modalOnlyButtonContent"
              >
                <p
                  id="airportLocationBothParkingStandButton"
                  className="fontSizeDefault modalButton"
                >
                  {textTriggerType === 'arrival'
                    ? AIRPORT_LOCATION.airport_location.arrival_and_departure
                    : AIRPORT_LOCATION.airport_location.departure_and_arrival}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
