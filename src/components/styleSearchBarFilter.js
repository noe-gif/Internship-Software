import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '0.06vmax solid #cccbcb',
  borderRadius: '2vw',
  backgroundColor: 'white',
  height: '2vmax',
  width: '2vmax',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '1vmax',
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(() => ({
  color: '#14D2B8',
  padding: '0vmax',
  paddingLeft: '0.7vmax',
  height: '2.1vmax',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: '1vmax',
  fontWeight: '540',
  color: '#14D2B8',
  '& .MuiInputBase-input': {
    padding: '0.35vmax',
    paddingLeft: '2.5vmax',
    transition: theme.transitions.create('width'),
    width: '10vmax',
    height: '1.4vmax',
    [theme.breakpoints.up('sm')]: {
      width: '6.5vmax',
      '&:focus': {
        width: '10vmax',
      },
    },
  },
  'input::placeholder': {
    color: 'black',
  },
}));
