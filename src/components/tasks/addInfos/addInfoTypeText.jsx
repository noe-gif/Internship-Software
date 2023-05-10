import React, { useEffect } from 'react';

import AddInfoSaver from 'src/containers/tasks/addInfos/addInfoSaverContainer';

import addInfoTypeTextHook from 'src/hooks/task/addInfos/addInfoTypeTextHook';

import { getTaskBackgroundColorIfAutoValue } from 'src/utils/component/task';

import { onEnterKeyPress } from 'src/utils/logic/keyboardPress/onKeyPress';

import { ADD_INFO_TEXT_MAX_LENGTH } from 'src/constants/fieldLength';

import { AUTO_ADD_INFO_TEXT_INPUT_CLASSNAME } from 'src/constants/tasks/tasksConstant';

import TASKS_TEXT from 'src/constants/tasks/tasksText.json';

export default function AddInfoTypeText(props) {
  const {
    addInfo,
    addInfoStatus,
    resetAddInfoStatus,
    updateAddInfos,
  } = props;

  const {
    addInfoValue,
    addInfoTemporaryValue,
    addInfoTextDynamicHeight,
    modifyAddInfoTextDynamicHeight,
    onChangeAddInfoValue,
    refreshAddInfoValue,
    resetAddInfoValue,
    updateTaskAddInfo,
  } = addInfoTypeTextHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos);

  useEffect(() => {
    resetAddInfoValue();
  }, [addInfoStatus]);

  useEffect(() => {
    refreshAddInfoValue();
  }, [addInfo]);

  useEffect(() => {
    modifyAddInfoTextDynamicHeight();
  }, [addInfoValue]);

  const renderAddInfoInput = () => (
    <div className="addInfoAction">
      <div className="addInfoTextActionInputContainer">
        <textarea
          id={`addInfoTypeText${addInfo.id}`}
          className={`addInfoTextActionInput 
          ${getTaskBackgroundColorIfAutoValue(addInfo.auto_value, AUTO_ADD_INFO_TEXT_INPUT_CLASSNAME)}`}
          onChange={onChangeAddInfoValue}
          onKeyDown={(event) => { onEnterKeyPress(event.key, updateTaskAddInfo); }}
          placeholder={TASKS_TEXT.add_info.text_placeholder}
          type="textarea"
          ref={addInfoTextDynamicHeight}
          value={addInfoTemporaryValue}
          maxLength={ADD_INFO_TEXT_MAX_LENGTH}
          rows={1}
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
