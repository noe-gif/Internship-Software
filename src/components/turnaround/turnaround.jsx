import React from 'react';

import {
  Card, Grid,
} from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import TurnaroundContent from 'src/components/turnaround/turnaroundContent/turnaroundContent';

import turnaroundHook from 'src/hooks/turnaround/turnaroundHook';
import TurnaroundMarker from 'src/components/turnaround/turnaroudMarker';

import { useStyles, themeLarge, themeSmall } from 'src/components/turnaround/styleTurnaround';

import 'src/styles/Turnaround.css';

export default function Turnaround(props) {
  const {
    turnaround,
    date,
  } = props;

  const classes = useStyles();

  const {
    iconSize,
    isSelected,
    isSmall,
    handleTurnaroundSelection,
    selectedIndex,
  } = turnaroundHook(props);

  return (
    <div
      id={`turnaround${turnaround.id}`}
      className="turnaroundWrapper"
      onClick={handleTurnaroundSelection}
      role="button"
      aria-hidden="true"
    >
      <ThemeProvider theme={isSmall ? themeSmall : themeLarge}>
        <Grid className={classes.cardLineContainer} container>
          <Card className={isSelected ? classes.rootSelected : classes.root}>
            {isSelected && (
              <TurnaroundMarker
                turnaroundId={turnaround.id}
                label={selectedIndex}
              />
            )}
            <TurnaroundContent
              classes={classes}
              turnaroundDate={date}
              iconSize={iconSize}
              isSmall={isSmall}
              turnaround={turnaround}
            />
          </Card>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
