import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { color } from '../../../themes/colour';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '& input': {
      width: '100%',
      border: 'none',
      borderRadius: '8px',
      boxSizing: 'border-box',
      fontSize: '18px',
      lineHeight: '20px',
      color: theme.palette.tabLabel?.dark,
      fontWeight: '600',
      '&:focus-visible': {
        outline: 'none',
      },
      '&::placeholder': {
        color: '#B1BACB',
      },
    },
    '& .Mui-error fieldset': {
      borderColor: '#ff4040 !important',
    },
    '& .Mui-disabled input': {
      color: `${color.gray106} !important`,
      background: color.gray105,
    },
    '& .Mui-disabled': {
      background: color.gray105,
    },
  },
  label: {
    color: theme.palette.customBody.main,
    lineHeight: '16px',
    fontSize: '12px',
    gridRow: 'label',
    gridColumn: 'label',
    marginBottom: '4px',
  },
  adornment: {
    marginRight: '0px !important',
    padding: '0px 10px',
    '& .MuiTypography-root': {
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '18px',
      color: theme.palette.body?.light,
    },
  },
  dateField: {
    '& .MuiInputBase-root': {
      borderRadius: '8px',
      padding: '2px 8px',
      '& fieldset': {
        borderColor: theme.palette.tabLabel?.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.body?.light,
      },
      '&.Mui-disabled fieldset': {
        borderColor: `${color.gray107} !important`,
      },
    },
  },
}));
