import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { ADD_INFO_SAVE_ICON } from 'src/constants/picturePath';

import addInfoSaverHook from 'src/hooks/task/addInfos/addInfoSaverHook';

export default function AddInfoSaver(props) {
  const {
    addInfoId,
    addInfoValue,
    isAddInfoWithError,
    updateAddInfos,
  } = props;

  const {
    isValidToUpdate,
    updateTaskAddInfo,
  } = addInfoSaverHook(addInfoId, addInfoValue, updateAddInfos);

  return (
    <>
      {(isValidToUpdate() && !isAddInfoWithError) && (
        <div className="addInfoSave" onClick={updateTaskAddInfo} aria-hidden="true">
          <img
            src={ADD_INFO_SAVE_ICON}
            alt="ADD INFO SAVE ICON"
            className="addInfoSaveButton"
          />
        </div>
      )}
      {isAddInfoWithError && (
        <div className="addInfoSave">
          <FontAwesomeIcon icon={faExclamationCircle} className="addInfoWaringButton" />
        </div>
      )}
    </>
  );
}
