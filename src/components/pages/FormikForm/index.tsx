import React from 'react';
import CurrencyInput from './common/CurrencyInput';
import DateInput from './common/DateInput';
import { Button, Paper, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikDateInput from './common/DateInput';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const FormikForm = () => {
  const initialValues = {
    name: '',
    email: '',
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log(values);
    // You can perform further actions here, such as making API calls
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field
            name='name'
            label='Name'
            variant='outlined'
            fullWidth
            render={FormikDateInput}
          />
          <ErrorMessage name='name' component='div' />
        </div>
        <div>
          <Field
            as={TextField}
            name='name'
            label='Name'
            variant='outlined'
            fullWidth
          />
          <ErrorMessage name='name' component='div' />
        </div>
        <div>
          <Field
            as={TextField}
            name='email'
            label='Email'
            variant='outlined'
            fullWidth
          />
          <ErrorMessage name='email' component='div' />
        </div>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default FormikForm;
