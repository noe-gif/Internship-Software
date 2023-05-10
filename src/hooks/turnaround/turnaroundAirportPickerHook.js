import { useState } from 'react';

import { ENTER_KEY_CODE } from 'src/constants/keyCodeConstant';

import { hasAirportSelectedCorrectCriteriaToLaunchRequest }
  from 'src/utils/component/turnaround/turnaroundAirportPicker';

import { useStylesAutocomplete } from 'src/components/styleAirportForm';

export default function turnaroundAirportPickerHook(props) {
  const {
    datePicked,
    turnaroundRequestAction,
    userAccessToken,
  } = props;

  const classes = useStylesAutocomplete();
  const [airportValue, setAirportValue] = useState('');

  const handleChange = (event) => {
    if (hasAirportSelectedCorrectCriteriaToLaunchRequest(event.target.textContent)) {
      const fetchTurnarounds = async () => {
        await turnaroundRequestAction(
          userAccessToken,
          datePicked,
          event.target.textContent,
        );
      };
      fetchTurnarounds();
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === ENTER_KEY_CODE) {
      const fetchTurnaroundsFromEnterKeyCode = async () => {
        await turnaroundRequestAction(
          userAccessToken,
          datePicked,
          airportValue,
        );
      };
      fetchTurnaroundsFromEnterKeyCode();
    }
  };

  return {
    classes,
    handleChange,
    handleInputKeyDown,
    setAirportValue,
  };
}
