import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { Box, FormHelperText, InputAdornment } from '@mui/material';
import { useStyles } from './index.styles';
// import { Icon } from '../Icon';

const DateInput = ({
  text,
  label,
  onValueChange,
  helperText,
  onChange,
  ...rest
}: any) => {
  return (
    <Box>
      <Box>{label}</Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          onChange={(newValue: any) => {
            onValueChange(new Date(newValue));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {/* <Icon name='datepicker-calendar' /> */}
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      </LocalizationProvider>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

export default DateInput;
