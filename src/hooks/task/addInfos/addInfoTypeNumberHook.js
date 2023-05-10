import { useState } from 'react';

import { FAIL, SUCCESS } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import {
  isValueFilledAndPositive,
  setUseStateNumberValue,
} from 'src/utils/logic/tasks/addInfo';

export default function addInfoTypeNumberHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos) {
  const [addInfoValue, setAddInfoValue] = useState(null);
  const [addInfoTemporaryValue, setAddInfoTemporaryValue] = useState(setUseStateNumberValue(addInfo));

  const onChangeAddInfoValue = (event) => {
    event.preventDefault();

    const { target } = event;

    setAddInfoTemporaryValue(target.value);
    if (isValueFilledAndPositive(target.value)) {
      setAddInfoValue(target.value);
    } else {
      setAddInfoValue(null);
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
    setAddInfoTemporaryValue(setUseStateNumberValue(addInfo));
  };

  const updateTaskAddInfo = () => {
    if (addInfoValue !== null) {
      const addInfoCompleteData = {
        value: addInfoValue,
      };

      updateAddInfos({ data: addInfoCompleteData, addInfoId: addInfo.id });
    }
  };

  return {
    addInfoValue,
    addInfoTemporaryValue,
    onChangeAddInfoValue,
    refreshAddInfoValue,
    resetAddInfoValue,
    updateTaskAddInfo,
  };
}
