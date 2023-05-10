import React from 'react';

import LabeledButtonWithMarker from 'src/components/fragment/LabeledButtonWithMarker';

import { COMMENT_ICON } from 'src/constants/picturePath';

import TASKS_TEXT from 'src/constants/tasks/tasksText.json';

export default function OpenTaskComments(props) {
  const {
    numberOfComments,
    openTaskCommentsFunction,
    taskId,
  } = props;

  return (
    <LabeledButtonWithMarker
      id={`taskCommentsButton${taskId}`}
      imgSrc={COMMENT_ICON}
      label={TASKS_TEXT.infos.comments}
      numberToDisplay={numberOfComments}
      onClick={openTaskCommentsFunction}
    />
  );
}
