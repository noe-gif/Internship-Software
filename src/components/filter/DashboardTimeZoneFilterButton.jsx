import React from 'react';
import 'src/styles/DashboardTimeZoneFilter.css';

export default function DashboardTimeZoneFilterButton(props) {
  const {
    clickHandler,
    id,
    isSelected,
    text,
  } = props;

  return (
    <button
      type="button"
      className={`dashboardTimeZoneFilterButton ${
        isSelected ? 'dashboardTimeZoneFilterButton__active' : ''
      }`}
      onClick={clickHandler}
      id={id}
    >
      {text}
    </button>
  );
}
