import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormikTextField from '../../FormikElements/TextField';
import FormikDateInput from '../../FormikElements/DateInput';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  dateStart: Yup.date().nullable(),
});

const FormikForm = () => {
  const initialValues = {
    name: '',
    email: '',
    dateStart: null,
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
      {(formik: any) => (
        <Form>
          <div>
            <Field
              name='name'
              label='Name'
              variant='outlined'
              fullWidth
              component={FormikTextField}
            />
            <ErrorMessage name='name' component='div' />
          </div>
          <div>
            <Field
              name='dateStart'
              variant='outlined'
              placeholder='MM/DD/YYYY'
              fullWidth
              component={FormikDateInput}
            />
            <ErrorMessage name='name' component='div' />
          </div>
          {/* <div>
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
            component={TextField}
            name='email'
            label='Email'
            variant='outlined'
            fullWidth
          />
          <ErrorMessage name='email' component='div' />
        </div> */}
          <Button
            variant='contained'
            color='error'
            onClick={formik.resetForm}
            disabled={!formik.values.name && !formik.values.dateStart}
          >
            Clear All
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => {
              console.log('values', formik.values);
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
