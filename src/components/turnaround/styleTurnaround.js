import {
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@mui/material';

import { makeStyles, withStyles } from '@mui/styles';

const RedTypography = withStyles({
  root: {
    color: '#F54E5E',
  },
})(Typography);

const GreenTypography = withStyles({
  root: {
    color: '#09AF52',
  },
})(Typography);

const ItalicTypography = withStyles({
  root: {
    fontStyle: 'italic',
    lineHeight: '1.2',
  },
})(Typography);

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginBottom: '1vmax',
    alignItems: 'center',
    borderRadius: '0.7vmax',
    padding: '0.3vmax',
    boxShadow: `-0.2vmax -0.1vmax 0.1vmax -0.2vmax #1b2e4b,
    -0.05vmax 0vmax 0.05vmax 0vmax #1b2e4b, 0.05vmax 0vmax 0.2vmax 0vmax #1b2e4b`,
  },
  flightInformation: {
    maxWidth: '17%',
    marginLeft: '0',
    marginRight: '0',
  },
  cardLineContentContainer: {
    maxWidth: '100%',
  },
  bottomInformation: {
    flexBasis: '47%',
    maxWidth: '64%',
  },
  rootSelected: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginBottom: '1vmax',
    padding: '0.3vmax',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    borderRadius: '0.7vmax',
    backgroundColor: '#E8ECF2',
    boxShadow: `-0.2vmax -0.1vmax 0vmax -0.2vmax #1b2e4b, -0.05vmax 0vmax 0.05vmax 0vmax #1b2e4b,
    0.05vmax 0vmax 0.2vmax 0vmax #1b2e4b`,
  },
  icons: {
    padding: '0vmax',
    alignItems: 'center',
    margin: '0.35vmax',
  },
  logo: {
    padding: '0vmax',
    alignItems: 'center',
  },
  turnaroundHeaderLogo: {
    height: '3vh',
    width: 'auto',
    padding: '0vmax',
    alignItems: 'center',
  },
  turnaroundLogo: {
    height: '2vmax',
    width: 'auto',
    padding: '0vmax',
    alignItems: 'center',
  },
  contentVertical: {
    color: '#1F2673',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentHorizontal: {
    color: '#1F2673',
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  arrivalFlightBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
  },
  arrivalFlightBlockSmall: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
  },
  arrivalFlightNumber: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
    alignItems: 'center',
    marginRight: '0.4vmax',
  },
  arrivalFlightNumberText: {
    fontSize: '0.95vmax',
  },
  arrivalFlightNumberTextLarge: {
    fontSize: '1.4vw',
  },
  flightIcon: {
    color: '#1F2673',
    flexWrap: 'wrap',
    '&:last-child': {
      paddingBottom: '0vmax',
    },
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 'fit-content',
    margin: '0 auto',
  },
  departureFlightBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  departureFlightBlockSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  departureFlightNumber: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  departureFlightNumberText: {
    fontSize: '0.95vmax',
  },
  departureFlightNumberTextLarge: {
    fontSize: '1.4vw',
  },
  middleTopCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  cardLineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 0,
  },
  aircraftCharacteristicContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 0,
  },
  bottomCardLineStart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  bottomCardLineEnd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  bottomCardLineMiddle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  bottomTime: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  bottomTimeSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontSize: '0.95vmax',
  },
  bottomTimingSmall: {
    fontSize: '0.95vmax',
  },
  bottomTimeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCardLineStart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  topCardLineMiddleContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  topCardLineMiddle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  topCardLineEnd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    '&:last-child': {
      paddingBottom: '0vmax',
    },
  },
  delayCode: {
    fontSize: '0.75vmax',
  },
  tailNumberJustifyEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const themeLarge = createMuiTheme({
  palette: {
    primary: {
      main: '#1F2673',
    },
    secondary: {
      main: '#50A1FF',
    },
    error: {
      main: '#F54E5E',
    },
    textPrimary: {
      main: '#323C47',
    },
    textSecondary: {
      main: 'green',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Inter',
    body1: {
      display: 'flex',
      fontSize: '1.25rem',
      fontFamily: 'Inter',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
    },
    body2: {
      display: 'flex',
      fontSize: '1.25rem',
      fontFamily: 'Inter',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
      marginLeft: 5,
    },
    subtitle1: {
      display: 'flex',
      fontSize: '1.625rem',
      fontFamily: 'Inter',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    subtitle2: {
      display: 'flex',
      fontSize: '1.625rem',
      fontFamily: 'Inter',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    h5: {
      display: 'flex',
      fontFamily: 'Inter',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

const themeSmall = createMuiTheme({
  palette: {
    primary: {
      main: '#1F2673',
    },
    secondary: {
      main: '#50A1FF',
    },
    error: {
      main: '#F54E5E',
    },
    textPrimary: {
      main: '#323C47',
    },
    textSecondary: {
      main: 'green',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Inter',
    body1: {
      display: 'flex',
      fontSize: '1rem',
      fontFamily: 'Inter',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
    },
    body2: {
      display: 'flex',
      fontSize: '1rem',
      fontFamily: 'Inter',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
      marginLeft: 5,
    },
    subtitle1: {
      display: 'flex',
      fontSize: '1.25rem',
      fontFamily: 'Inter',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    subtitle2: {
      display: 'flex',
      fontSize: '1.25rem',
      fontFamily: 'Inter',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    h5: {
      display: 'flex',
      fontFamily: 'Inter',
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

export {
  useStyles,
  themeLarge,
  themeSmall,
  GreenTypography,
  RedTypography,
  ItalicTypography,
};
