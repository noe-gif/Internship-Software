import { useRef, useState } from 'react';

import { convertPxToVmax } from 'src/utils/logic/style/cssUnityCalculation';

import { SUCCESS, FAIL } from 'src/constants/turnaroundDetail/turnaroundDetailTimings';

import {
  isValueFilled,
  setUseStateTextValue,
} from 'src/utils/logic/tasks/addInfo';

export default function addInfoTypeTextHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos) {
  const addInfoTextDynamicHeight = useRef(null);
  const [addInfoValue, setAddInfoValue] = useState(null);
  const [addInfoTemporaryValue, setAddInfoTemporaryValue] = useState(setUseStateTextValue(addInfo));

  const onChangeAddInfoValue = (event) => {
    event.preventDefault();

    const { target } = event;

    setAddInfoTemporaryValue(target.value);
    if (isValueFilled(target.value)) {
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
    setAddInfoTemporaryValue(setUseStateTextValue(addInfo));
  };

  const updateTaskAddInfo = () => {
    if (addInfoValue !== null) {
      const addInfoCompleteData = {
        value: addInfoValue,
      };

      updateAddInfos({ data: addInfoCompleteData, addInfoId: addInfo.id });
    }
  };

  const modifyAddInfoTextDynamicHeight = () => {
    const textAreaOneRowSize = 1.6111111111111112;
    let scrollHeight = 0;

    if (addInfoTextDynamicHeight && addInfoTextDynamicHeight.current) {
      addInfoTextDynamicHeight.current.style.height = '0vmax';

      const textAreaSize = convertPxToVmax(addInfoTextDynamicHeight.current.scrollHeight, 18);

      if (textAreaSize === textAreaOneRowSize) {
        scrollHeight = convertPxToVmax(addInfoTextDynamicHeight.current.scrollHeight, 60);
      } else {
        scrollHeight = convertPxToVmax(addInfoTextDynamicHeight.current.scrollHeight, 18.2);
      }
      addInfoTextDynamicHeight.current.style.height = `${scrollHeight}vmax`;
    }
  };

  return {
    addInfoValue,
    addInfoTemporaryValue,
    addInfoTextDynamicHeight,
    modifyAddInfoTextDynamicHeight,
    onChangeAddInfoValue,
    refreshAddInfoValue,
    resetAddInfoValue,
    updateTaskAddInfo,
  };
}
