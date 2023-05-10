import React from 'react';

import {
  CHECKBOX_ADD_INFO_TYPE,
  DATETIME_ADD_INFO_TYPE,
  NUMBER_ADD_INFO_TYPE,
  TEXT_ADD_INFO_TYPE,
} from 'src/constants/tasks/tasksConstant';

import AddInfoTypeCheckbox from 'src/containers/tasks/addInfos/addInfoTypeCheckboxContainer';
import AddInfoTypeDatetime from 'src/containers/tasks/addInfos/addInfoTypeDatetimeContainer';
import AddInfoTypeNumber from 'src/containers/tasks/addInfos/addInfoTypeNumberContainer';
import AddInfoTypeText from 'src/containers/tasks/addInfos/addInfoTypeTextContainer';

export default function AddInfo(props) {
  const {
    addInfo,
  } = props;

  const displayAddInfoTitle = () => (
    <div className="addInfoTitle">
      <p
        id={`addInfoCustomLabel${addInfo.id}`}
        className="fontSizeDefault fontColorDefault"
      >
        {addInfo.custom_label}
      </p>
    </div>
  );

  const displayAddInfoContent = () => {
    switch (addInfo.information_type) {
    case CHECKBOX_ADD_INFO_TYPE:
      return (
        <AddInfoTypeCheckbox
          addInfo={addInfo}
        />
      );
    case NUMBER_ADD_INFO_TYPE:
      return (
        <AddInfoTypeNumber
          addInfo={addInfo}
        />
      );
    case TEXT_ADD_INFO_TYPE:
      return (
        <AddInfoTypeText
          addInfo={addInfo}
        />
      );
    case DATETIME_ADD_INFO_TYPE:
      return (
        <AddInfoTypeDatetime
          addInfo={addInfo}
        />
      );
    default:
      return null;
    }
  };

  return (
    <>
      {displayAddInfoTitle()}
      {displayAddInfoContent()}
    </>
  );
}
