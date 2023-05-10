import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border: 'none',
  },
  textFieldDate: {
    border: 'none',
    width: '10.5vw',
    color: 'red',
    ' & input': {
      fontSize: '0.8vw',
      padding: '5px',
      color: '#1F2673',
      height: '1.5vh',
      cursor: 'pointer',
    },
    '& input::-webkit-calendar-picker-indicator': {
      background: 'transparent',
      bottom: '0',
      color: 'transparent',
      cursor: 'pointer',
      height: 'auto',
      left: '0',
      position: 'absolute',
      right: '0',
      top: '0',
      width: 'auto',
    },
    '&input::placeholder': {
      fontSize: '0.8vmax',
      color: '#C4C4C4',
      fontStyle: 'italic',
    },
    '&input:focus': {
      outline: 'none',
    },
    '& fieldset': {
      display: 'none',
    },
  },
}));

export default useStyles;
