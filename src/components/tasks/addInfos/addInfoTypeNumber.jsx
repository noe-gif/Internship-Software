import React, { useEffect } from 'react';

import AddInfoSaver from 'src/containers/tasks/addInfos/addInfoSaverContainer';

import addInfoTypeNumberHook from 'src/hooks/task/addInfos/addInfoTypeNumberHook';

import { onEnterKeyPress } from 'src/utils/logic/keyboardPress/onKeyPress';

import TASKS_TEXT from 'src/constants/tasks/tasksText.json';

import { AUTO_ADD_INFO_INPUT_CLASSNAME } from 'src/constants/tasks/tasksConstant';

import { getTaskBackgroundColorIfAutoValue } from 'src/utils/component/task';

export default function AddInfoTypeNumber(props) {
  const {
    addInfo,
    addInfoStatus,
    resetAddInfoStatus,
    updateAddInfos,
  } = props;

  const {
    addInfoValue,
    addInfoTemporaryValue,
    onChangeAddInfoValue,
    refreshAddInfoValue,
    resetAddInfoValue,
    updateTaskAddInfo,
  } = addInfoTypeNumberHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos);

  useEffect(() => {
    resetAddInfoValue();
  }, [addInfoStatus]);

  useEffect(() => {
    refreshAddInfoValue();
  }, [addInfo]);

  const renderAddInfoInput = () => (
    <div className="addInfoAction">
      <div className="addInfoActionInputContainer">
        <input
          id={`addInfoTypeNumber${addInfo.id}`}
          className={`addInfoActionInput 
          ${getTaskBackgroundColorIfAutoValue(addInfo.auto_value, AUTO_ADD_INFO_INPUT_CLASSNAME)}`}
          min="0"
          onChange={onChangeAddInfoValue}
          onKeyDown={(event) => { onEnterKeyPress(event.key, updateTaskAddInfo); }}
          placeholder={TASKS_TEXT.add_info.number_placeholder}
          type="number"
          value={addInfoTemporaryValue}
        />
      </div>
    </div>
  );

  return (
    <>
      {renderAddInfoInput()}
      <AddInfoSaver
        addInfoId={addInfo.id}
        addInfoValue={addInfoValue}
      />
    </>
  );
}
