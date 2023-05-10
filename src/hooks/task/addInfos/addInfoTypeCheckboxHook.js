import { useState } from 'react';

import { SUCCESS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import { setUseStateCheckBoxValue } from 'src/utils/logic/tasks/addInfo';

export default function addInfoTypeCheckboxHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos) {
  const [addInfoValue, setAddInfoValue] = useState(null);
  const [addInfoTemporaryValue, setAddInfoTemporaryValue] = useState(setUseStateCheckBoxValue(addInfo));

  const onChangeAddInfoValue = (value) => {
    setAddInfoValue(value);
    setAddInfoTemporaryValue(value);
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
    setAddInfoTemporaryValue(setUseStateCheckBoxValue(addInfo));
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
