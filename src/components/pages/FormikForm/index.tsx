import React from 'react';
import CurrencyInput from './common/CurrencyInput';
import DateInput from './common/DateInput';
import { Paper } from '@mui/material';
const FormikForm = () => {
  return (
    <Paper>
      <CurrencyInput />
      <DateInput />
    </Paper>
  );
};

export default FormikForm;
