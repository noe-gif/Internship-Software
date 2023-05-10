import React, { useEffect } from 'react';

import { TextField } from '@mui/material';

import AddInfoSaver from 'src/containers/tasks/addInfos/addInfoSaverContainer';

import { onEnterKeyPress } from 'src/utils/logic/keyboardPress/onKeyPress';

import addInfoTypeDatetimeHook from 'src/hooks/task/addInfos/addInfoTypeDatetimeHook';

import useStyles from 'src/components/tasks/addInfos/styleAddInfoTypeDatetime';

export default function AddInfoTypeDatetime(props) {
  const {
    addInfo,
    addInfoStatus,
    resetAddInfoStatus,
    updateAddInfos,
  } = props;

  const {
    addInfoValue,
    addInfoTemporaryValue,
    isAddInfoValueValid,
    onChangeAddInfoValue,
    refreshAddInfoValue,
    resetAddInfoValue,
    selectedTimezone,
    setIsDateBadInput,
    updateTaskAddInfo,
  } = addInfoTypeDatetimeHook(addInfo, addInfoStatus, resetAddInfoStatus, updateAddInfos);

  const classes = useStyles();

  useEffect(() => {
    resetAddInfoValue();
  }, [addInfoStatus]);

  useEffect(() => {
    refreshAddInfoValue();
  }, [addInfo, selectedTimezone]);

  const renderAddInfoInput = () => (
    <div className="addInfoAction">
      <div className={classes.container}>
        <TextField
          id={`addInfoTypeDatetime${addInfo.id}`}
          className={classes.textFieldDate}
          onBlur={(event) => setIsDateBadInput(event.target.validity.badInput)}
          onChange={onChangeAddInfoValue}
          onFocus={() => setIsDateBadInput(false)}
          onKeyDown={(event) => { onEnterKeyPress(event.key, updateTaskAddInfo); }}
          type="datetime-local"
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
        isAddInfoWithError={!isAddInfoValueValid()}
      />
    </>
  );
}
