import React from 'react';

export default function TaskTimingButton(props) {
  const {
    className,
    label,
    onClick,
    taskId,
  } = props;
  return (
    <div className="taskButtonWrapper">
      <div
        id={`taskButton${taskId}${label}`}
        className={className}
        aria-hidden="true"
        onClick={onClick}
      >
        <p
          id={`taskButton${taskId}Label${label}`}
          className="fontSizeDefaultBold taskButtonLabel taskTimingButton"
        >
          {label}
        </p>
      </div>
    </div>
  );
}
