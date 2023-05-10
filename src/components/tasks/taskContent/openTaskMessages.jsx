import React from 'react';

import LabeledButtonWithMarker from 'src/components/fragment/LabeledButtonWithMarker';

import { MESSAGE_ICON } from 'src/constants/picturePath';

import TASKS_TEXT from 'src/constants/tasks/tasksText.json';

export default function OpenTaskMessages(props) {
  const {
    numberOfMessages,
    openTaskMessagesFunction,
    taskId,
  } = props;

  return (
    <LabeledButtonWithMarker
      id={`taskMessagesButton${taskId}`}
      imgSrc={MESSAGE_ICON}
      label={TASKS_TEXT.infos.messages}
      numberToDisplay={numberOfMessages}
      onClick={openTaskMessagesFunction}
    />
  );
}
