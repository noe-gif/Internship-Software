import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border: 'none',
    justifyContent: 'space-around',
  },
  textField: {
    color: '#8f8f8f',
    '& input': {
      fontSize: '0.8vw',
      padding: '0',
      color: '#1F2673',
      textAlign: 'center',
      cursor: 'pointer',
    },
    '& input::placeholder': {
      fontSize: '0.8vw',
    },
  },
}));

export default useStyles;
