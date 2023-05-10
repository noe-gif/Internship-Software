import React, { useEffect } from 'react';

import AddInfoSaver from 'src/containers/tasks/addInfos/addInfoSaverContainer';

import { onEnterKeyPress } from 'src/utils/logic/keyboardPress/onKeyPress';

import TASKS_TEXT from 'src/constants/tasks/tasksText.json';

import addInfoTypeCheckboxHook from 'src/hooks/task/addInfos/addInfoTypeCheckboxHook';

export default function AddInfoTypeCheckbox(props) {
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
  } = addInfoTypeCheckboxHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos);

  useEffect(() => {
    resetAddInfoValue();
  }, [addInfoStatus]);

  useEffect(() => {
    refreshAddInfoValue();
  }, [addInfo]);

  const renderAddInfoInput = () => (
    <div className="addInfoAction">
      <div className="addInfoActionCheckboxWrapper">
        <input
          id={`addInfoCheckbox${addInfo.id}True`}
          checked={addInfoTemporaryValue === true}
          className="addInfoActionCheckbox"
          name={`firstChoice${addInfo.id}`}
          onChange={() => onChangeAddInfoValue(true)}
          onKeyDown={(event) => { onEnterKeyPress(event.key, updateTaskAddInfo); }}
          type="checkbox"
          value="Yes"
        />
        <p
          className="fontSizeDefault fontColorDefault addInfoActionCheckboxText"
        >
          {TASKS_TEXT.add_info.checkbox_first_label}
        </p>
        <input
          id={`addInfoCheckbox${addInfo.id}False`}
          checked={addInfoTemporaryValue === false}
          className="addInfoActionCheckbox"
          name={`secondChoice${addInfo.id}`}
          onChange={() => onChangeAddInfoValue(false)}
          onKeyDown={(event) => { onEnterKeyPress(event.key, updateTaskAddInfo); }}
          type="checkbox"
          value="No"
        />
        <p
          className="fontSizeDefault fontColorDefault addInfoActionCheckboxText"
        >
          {TASKS_TEXT.add_info.checkbox_second_label}
        </p>
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
