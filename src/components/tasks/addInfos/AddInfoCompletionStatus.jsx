import React from 'react';
import AddInfoCompletionStatusHook from 'src/hooks/task/addInfos/AddInfoCompletionStatusHook';
import { getCompletionStatusColor } from 'src/utils/logic/tasks/taskCompletionStatusColor';

export default function AddInfoCompletionStatus(props) {
  const {
    task,
    componentSize,
  } = props;

  const {
    hideCompletionStatusIfNotNeeded,
    isComponentSizeInLargeView,
  } = AddInfoCompletionStatusHook(
    componentSize,
    task,
  );

  return (
    <div>
      <div
        id={`AddInfoCompletionStatus${task.id}`}
        className={isComponentSizeInLargeView()}
        style={{
          backgroundColor: getCompletionStatusColor(task),
          visibility: hideCompletionStatusIfNotNeeded(),
        }}
      />
    </div>
  );
}
