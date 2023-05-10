import React from 'react';

import AddInfo from 'src/components/tasks/addInfos/addInfo';

import { getTaskBackgroundColorIfAutoValue } from 'src/utils/component/task';

import { AUTO_ADD_INFO_WRAPPER_CLASSNAME } from 'src/constants/tasks/tasksConstant';

import 'src/styles/AddInfos.css';

export default function AddInfos(props) {
  const { addInfos, task } = props;

  return (
    <div className="addInfosListWrapper">
      {task.is_applicable && (
        addInfos.map((addInfo) => (
          <div
            key={addInfo.id}
            className={`addInfoWrapper 
            ${getTaskBackgroundColorIfAutoValue(addInfo.auto_value, AUTO_ADD_INFO_WRAPPER_CLASSNAME)}`}
          >
            <AddInfo addInfo={addInfo} />
          </div>
        ))
      )}
    </div>
  );
}
