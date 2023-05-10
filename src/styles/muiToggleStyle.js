import { makeStyles } from '@mui/styles';

export const useStyleToggle = makeStyles(() => ({ // eslint-disable-line
  root: {
    width: '3.5vmax !important',
    height: '2.3vmax !important',
    padding: '0.7vmax',
    '& .Mui-checked': {
      color: '#1F2673',
      transform: 'translateX(1.2vmax)',
      padding: '0vmax',
    },
    '& .MuiSwitch-input': {
      width: '250% !important',
    },
    '& .MuiSwitch-thumb': {
      width: '1.2vmax',
      height: '1.2vmax',
      marginLeft: '0.6vmax',
      marginTop: '0.5vmax',
    },
    '& .MuiTouchRipple-root': {
      padding: '0vmax',
    },
    '& .Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#1F2673',
    },
    '& .Mui-checked:hover': {
      backgroundColor: 'transparent !important',
    },
    '& .MuiSwitch-switchBase': {
      padding: '0vmax',
    },
    '& .MuiSwitch-switchBase:hover': {
      backgroundColor: 'transparent !important',
    },
    '& .MuiSwitch-track': {
      borderRadius: '0.5vmax',
    },
  },
}));
