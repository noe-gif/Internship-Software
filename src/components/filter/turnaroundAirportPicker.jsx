import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { sortObjectsByIataCode } from 'src/utils/logic/sortObjectsByIataCode';

import turnaroundAirportPickerHook from 'src/hooks/turnaround/turnaroundAirportPickerHook';

export default function TurnaroundAirportPicker(props) {
  const {
    airportsAvailable,
    airportPicked,
    requestUserAirportAction,
    userAccessToken,
  } = props;

  const {
    classes,
    handleChange,
    handleInputKeyDown,
    setAirportValue,
  } = turnaroundAirportPickerHook(props);

  useEffect(() => {
    const getUserAuthorizedAirports = async () => {
      await requestUserAirportAction(userAccessToken);
    };
    getUserAuthorizedAirports();
  }, []);

  if (airportsAvailable) {
    const airportsSortedByName = airportsAvailable.sort(sortObjectsByIataCode);
    const sortedAirportsNames = airportsSortedByName.map((airportData) => airportData.iata_code);
    sortedAirportsNames.push('');// Adding '' to avoid Autocomplete to throw error when user enter empty value

    return (
      <div className="airportFormWrapper">
        <Autocomplete
          id="combo-box-demo"
          classes={classes}
          isOptionEqualToValue={(option, value) => option.airportPicked === value.airportPicked}
          options={sortedAirportsNames}
          defaultValue={airportPicked}
          value={airportPicked}
          onChange={(event) => { handleChange(event); }}
          className="airportAutoComplete fontSizeDefault"
          renderInput={(params) => (
            <TextField
              {...params} // eslint-disable-line
              label=""
              variant="outlined"
              onKeyDown={handleInputKeyDown}
              onChange={(event) => setAirportValue(event.target.value.toUpperCase())}
            />
          )}
          renderOption={(optionProps, option) => (
            <span
              {...optionProps}// eslint-disable-line
              className="airportAutoCompleteOption MuiAutocomplete-option"
            >
              {option}
            </span>
          )}
        />
      </div>
    );
  }
}
