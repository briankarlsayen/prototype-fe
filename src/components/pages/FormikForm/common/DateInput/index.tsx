import { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import DateInput from '../../../../common/DateInput';

const FormikDateInput = ({
  field,
  placeholder,
  label,
  addon,
  type,
  form,
  dataTestId,
  adornment,
  ...rest
}: any) => {
  // const defaultDate =
  //   'Sat Jun 10 2023 00:00:00 GMT+0800 (Singapore Standard Time)';
  const [date, setDate] = useState(null);
  console.log('date', date);
  const errorText = (
    form.touched?.[field?.name] && form.errors?.[field?.name]
      ? form.errors?.[field?.name]
      : ''
  ) as string;
  const onValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    form.setFieldValue(field.name, event.target.value);
  };

  console.log('label1', label);
  return (
    <DateInput
      variant='outlined'
      fullWidth
      placeholder={placeholder}
      label={label}
      error={Boolean(errorText)}
      helperText={errorText}
      onValueChange={onValueChange}
      adornment={adornment}
      disabled={form.isSubmitting}
      {...field}
    />
  );
};

export default FormikDateInput;
