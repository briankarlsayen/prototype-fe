import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DatePicker,
  DateField,
} from '@mui/x-date-pickers';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { CalendarToday } from '@mui/icons-material';

const DateInput = ({
  text,
  label,
  onValueChange,
  adornment,
  helperText,
  ...rest
}: any) => {
  const [date, setDate] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        value={date}
        onChange={(newValue: any) => {
          console.log('newValue', newValue?.$d);
          setDate(newValue?.$d);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton>
                <CalendarToday />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
