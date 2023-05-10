import React from 'react';
import { Grid } from '@mui/material';

import TurnaroundsPerDate from 'src/components/turnaround/turnaroundsPerDate';
import TurnaroundsScroller from 'src/components/turnaround/turnaroundsScroller';

import { dateRange } from 'src/utils/logic/date/dateRange';
import isListEmpty from 'src/utils/logic/isListEmpty';

export default function Turnarounds(props) {
  const {
    contentClass,
    datePicked,
    isInDetailsView,
    selectedTurnaroundDate,
    turnaroundCategoriesPerDate,
    turnarounds,
  } = props;

  return (
    <>
      <div className={`${contentClass} turnaroundsWrapper`}>
        <TurnaroundsScroller
          isInDetailsView={isInDetailsView}
          selectedTurnaroundDate={selectedTurnaroundDate}
          elementsToScrollOver={dateRange(datePicked[0], datePicked[1])}
          hasTurnaround={!isListEmpty(turnarounds)}
        />
        <Grid
          id="HomeContentWrapper"
          className="grid homeContentDetailsView"
          justifiy="center"
          alignContent="center"
          wrap="nowrap"
          container
          spacing={0}
        >
          <div id="turnaroundsStartRef" />
          {turnaroundCategoriesPerDate.map((turnaroundDateData) => (
            <TurnaroundsPerDate
              turnaroundCategoriesPerDate={turnaroundCategoriesPerDate}
              turnaroundDateData={turnaroundDateData}
              key={turnaroundDateData.date.toString()}
            />
          ))}
        </Grid>
      </div>
    </>
  );
}
