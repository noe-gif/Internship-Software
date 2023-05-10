import React from 'react';

export default function TimingEditor(props) {
  const {
    className, showModal, timingValue, timingType,
  } = props;

  return (
    <p
      onClick={showModal}
      aria-hidden="true"
      className={className}
      id={`${timingType}TimingValue`}
    >
      {timingValue}
    </p>
  );
}
