import { useState } from 'react';

import { isDateValidToUpdate } from 'src/utils/logic/date/dateValidators';
import { isValueFilled, setUseStateDateValue } from 'src/utils/logic/tasks/addInfo';

import { FAIL, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';

export default function addInfoTypeDatetimeHook(
  addInfo,
  addInfoStatus,
  resetAddInfoStatus,
  updateAddInfos,
) {
  const { state: { selectedTimezone } } = useTimezoneFilter();
  const [addInfoValue, setAddInfoValue] = useState(null);
  const [addInfoTemporaryValue, setAddInfoTemporaryValue] = useState(setUseStateDateValue(addInfo, selectedTimezone));
  const [isDateBadInput, setIsDateBadInput] = useState(false);

  const onChangeAddInfoValue = (event) => {
    event.preventDefault();

    const { target } = event;

    const newDate = new Date(target.value);

    setAddInfoTemporaryValue(target.value);
    if (isValueFilled(target.value)) {
      setAddInfoValue(newDate);
    } else {
      setAddInfoValue(null);
    }
  };

  const isAddInfoValueValid = () => {
    if (addInfoValue) {
      return isDateValidToUpdate(addInfoValue) && !isDateBadInput;
    } else {
      return true;
    }
  };

  const resetAddInfoValue = () => {
    if (addInfoStatus.addInfoId === addInfo.id && addInfoValue !== null) {
      if (addInfoStatus.status !== FAIL) {
        setAddInfoValue(null);
      } else if (addInfoStatus.status === SUCCESS) {
        setAddInfoValue(null);
      }
      resetAddInfoStatus();
    }
  };

  const refreshAddInfoValue = () => {
    setAddInfoValue(null);
    setAddInfoTemporaryValue(setUseStateDateValue(addInfo, selectedTimezone));
    setIsDateBadInput(false);
  };

  const updateTaskAddInfo = () => {
    if (addInfoValue !== null && isAddInfoValueValid()) {
      const addInfoCompleteData = {
        value: addInfoValue,
      };

      updateAddInfos({ data: addInfoCompleteData, addInfoId: addInfo.id });
    }
  };

  return {
    addInfoValue,
    addInfoTemporaryValue,
    isAddInfoValueValid,
    onChangeAddInfoValue,
    refreshAddInfoValue,
    resetAddInfoValue,
    selectedTimezone,
    setIsDateBadInput,
    updateTaskAddInfo,
  };
}
