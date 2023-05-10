import * as React from 'react';
import { TASK_DESCRIPTION_TITLE_CLASSNAME } from 'src/constants/tasks/tasksConstant';

export default function TaskPopupDescription(props) {
  const {
    title,
    description,
  } = props;

  return (
    <div>
      <p className={TASK_DESCRIPTION_TITLE_CLASSNAME}>{title}</p>
      <p>{description}</p>
    </div>
  );
}
