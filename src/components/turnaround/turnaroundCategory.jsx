import React, { useState } from 'react';

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import { ExpandMore } from '@mui/icons-material';

import Turnaround from 'src/containers/turnaround/turnaroundContainer';

import { arrivalAndDepartureFilter } from 'src/utils/logic/arrivalDepartureFilters';

import useStyles from './styleTurnaroundCategory';
import { themeLarge } from './styleTurnaround';

function TurnaroundCategory(props) {
  const {
    date,
    dataToDisplay,
    filteredTurnaround,
    title,
    turnaroundsData,
  } = props;

  const classes = useStyles();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const arrivalDepartureFilteredTurnaround = arrivalAndDepartureFilter(
    filteredTurnaround,
    date,
    turnaroundsData.arrivalChecked,
    turnaroundsData.departureChecked,
  );

  const generateTurnaround = () => (
    arrivalDepartureFilteredTurnaround.map((data) => (
      <Turnaround
        cardSize={dataToDisplay.length > 1 ? 'small' : 'large'}
        turnaround={data}
        key={data.id}
        date={date}
      />
    ))
  );

  return (
    <ThemeProvider theme={themeLarge}>
      <div className={classes.root}>
        {arrivalDepartureFilteredTurnaround.length > 0 && (
          <Accordion
            elevation={0}
            classes={{ expanded: classes.expanded }}
            className={classes.accordion}
            onChange={(expanded) => { setIsAccordionOpen(expanded); }}
          >
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <Box className={classes.accordionTitle}>
                <Typography className={classes.heading} variant="h5" color="primary">{title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.turnaroundsContainer}>
              {isAccordionOpen && generateTurnaround()}
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </ThemeProvider>
  );
}

export default TurnaroundCategory;
