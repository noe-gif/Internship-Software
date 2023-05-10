import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    font: theme.typography,
    fontSize: '1.3vmax',
    width: '100%',
  },
  expanded: {
    '&$expanded': {
      backgroundColor: '#FFFFFF',
      border: 'none',
      marginBottom: 0,
      elevation: 0,
    },
  },
  accordion: {
    backgroundColor: 'rgba(31, 38, 115, 0.07)',
    border: 'solid',
    borderWidth: '0.08vmax',
    borderColor: 'rgba(31, 38, 115, 1)',
    marginBottom: '2vmax',
    width: '90%',
    '& .MuiAccordionSummary-root': {
      padding: '0 1.5vmax',
      minHeight: '4vmax',
    },
  },
  accordionTitle: {
    marginLeft: '5%',
  },
  turnaroundsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
}));

export default useStyles;
