import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { Box, FormHelperText, InputAdornment } from '@mui/material';
import { useStyles } from './index.styles';
import { Icon } from '../Icon';

const DateInput = ({
  text,
  label,
  onValueChange,
  helperText,
  ...rest
}: any) => {
  const [date, setDate] = useState(null);
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      <Box className={styles.label}>{label}</Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          className={styles.dateField}
          value={date}
          onChange={(newValue: any) => {
            onValueChange(newValue?.$d);
            setDate(newValue?.$d);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment className={styles.adornment} position='start'>
                <Icon name='datepicker-calendar' />
              </InputAdornment>
            ),
          }}
        />
      </LocalizationProvider>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

export default DateInput;
