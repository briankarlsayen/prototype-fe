import { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
const DateInputField = styled(TextField)`
  margin-bottom: 16px;
`;

function DateInput() {
  // const defaultDate =
  //   'Sat Jun 10 2023 00:00:00 GMT+0800 (Singapore Standard Time)';
  const [date, setDate] = useState(null);
  console.log('date', date);
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['DatePicker']}>
    //     <DatePicker label='Basic date picker' />
    //   </DemoContainer>
    // </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='Original Release Date'
        value={date}
        onChange={(newValue: any) => {
          console.log('newValue', newValue?.$d);
          setDate(newValue?.$d);
        }}

        // renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
