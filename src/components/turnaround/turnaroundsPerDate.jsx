import React from 'react';
import { Box, Grid } from '@mui/material';

import TurnaroundCategory from 'src/containers/turnaround/turnaroundCategoryContainer';

import {
  dateToFormatWithWords,
  formatDateToDDMMYYYY,
  formatDateToDDMMYYYYWithHyphen,
} from 'src/utils/logic/date/formattedDate';
import {
  filterTurnaroundsCanceledStatus,
  filterTurnaroundsCompletedStatus,
  filterTurnaroundsIncomingStatus,
  filterTurnaroundsInProgressStatus,
} from 'src/utils/logic/turnaround/turnaroundFilters';
import isListEmpty from 'src/utils/logic/isListEmpty';
import turnaroundsListWidthOnTurnaroundSelected from 'src/utils/logic/home/calculateTurnaroundWidthElement';

import TURNAROUNDS_PER_DATE_TEXT from 'src/constants/turnaround/turnaroundsPerDateText.json';

export default function TurnaroundsPerDate(props) {
  const {
    turnaroundCategoriesPerDate,
    turnaroundDateData,
  } = props;

  const renderEmptyDate = () => {
    if (isListEmpty(turnaroundDateData.turnarounds)) {
      return (
        <p className="turnaroundsPerDateNoFlight">
          {TURNAROUNDS_PER_DATE_TEXT.no_flight}
        </p>
      );
    }

    return null;
  };

  return (
    <Grid key={turnaroundDateData.date.toString()} className="item" item overflow xs>
      <div
        id={`${formatDateToDDMMYYYY(turnaroundDateData.date)}Id`}
        key={turnaroundDateData.date.toString()}
        className="colTurnaroundsElement"
        style={{ minWidth: `${turnaroundsListWidthOnTurnaroundSelected()}px` }}
      >
        <p
          key={turnaroundDateData.date.toString()}
          className="dateTitle"
          id={`title${formatDateToDDMMYYYYWithHyphen(turnaroundDateData.date)}Id`}
        >
          {dateToFormatWithWords(turnaroundDateData.date)}
        </p>
        <Box className="turnaroundCategoriesBox">
          <TurnaroundCategory
            dataToDisplay={turnaroundCategoriesPerDate}
            filteredTurnaround={filterTurnaroundsInProgressStatus(turnaroundDateData.turnarounds)}
            date={turnaroundDateData.date}
            title="IN PROGRESS"
          />
          <TurnaroundCategory
            dataToDisplay={turnaroundCategoriesPerDate}
            filteredTurnaround={filterTurnaroundsIncomingStatus(turnaroundDateData.turnarounds)}
            date={turnaroundDateData.date}
            title="INCOMING"
          />
          <TurnaroundCategory
            dataToDisplay={turnaroundCategoriesPerDate}
            filteredTurnaround={filterTurnaroundsCompletedStatus(turnaroundDateData.turnarounds)}
            date={turnaroundDateData.date}
            title="COMPLETED"
          />
          <TurnaroundCategory
            dataToDisplay={turnaroundCategoriesPerDate}
            filteredTurnaround={filterTurnaroundsCanceledStatus(turnaroundDateData.turnarounds)}
            date={turnaroundDateData.date}
            title="CANCELED"
          />
          {renderEmptyDate()}
        </Box>
      </div>
    </Grid>
  );
}
