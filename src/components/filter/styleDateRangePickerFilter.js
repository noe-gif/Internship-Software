import { makeStyles } from '@mui/styles';

export const useStyleDateRangePicker = makeStyles(() => ({ // eslint-disable-line
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '2vmax',
      height: '2.1vmax',
      width: '8vmax',
      color: '#14D2B8',
      fontSize: '1vmax',
      backgroundColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#14D2B8',
      borderWidth: '0.1vmax',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '& .MuiDateRangePickerDay-day.Mui-selected': {
      backgroundColor: '#14D2B8',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9vmax',
      transform: 'translate(1vmax, -0.5vmax) scale(0.75)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#1B2E4B',
    },
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
    },
  },
}));
