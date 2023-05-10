import { makeStyles } from '@mui/styles';

export const useStylesAirportForm = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const useStylesAutocomplete = makeStyles(() => ({
  inputRoot: {
    color: '#14D2B8',
    padding: '0.3vw 0.3vw 0.4vw 1vw !important',
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderRadius: '100px',
      borderColor: '#d7d9e2',
      background: '#ffffff',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: '#d7d9e2',
      background: '#f0f0f0',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: '#14D2B8',
    },
    '& .MuiOutlinedInput-input': {
      zIndex: '1',
      padding: '0 !important',
      fontSize: '0.9vmax',
      textTransform: 'uppercase',
    },
    '& .MuiAutocomplete-endAdornment': {
      zIndex: '1',
      height: '3vh',
    },
    '& .css-4jkopv-MuiIconButton-label': {
      width: '0.7vw',
    },
    '& .css-ptiqhd-MuiSvgIcon-root': {
      width: '2vw',
      fontSize: '1.5vmax',
      height: '2vh',
    },
    '& .css-i4bv87-MuiSvgIcon-root': {
      width: '2vw',
      height: '3vh',
      fontSize: '1.5vmax',
    },
    '& .css-1z7n62': {
      display: 'none',
    },
    '& .css-1k33q06': {
      width: '1vmax',
      height: '1vmax',
    },
  },
}));
