import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Icon } from '../../common/Icon';
import { useStyles } from './index.styles';
import { useState } from 'react';
import { Field, Formik, Form, FormikConfig } from 'formik';
import FormikSelect from '../../FormikElements/Select';
import FormikTextField from '../../FormikElements/TextField';
import * as Yup from 'yup';
import { RequestersItems } from './resources';
import FormikCurrencyInput from '../../FormikElements/CurrencyInput';
import FormikDateInput from '../../FormikElements/DateInput';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

interface PFilterBtn {
  handleOpen: () => void;
}

const Filter = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box style={{ display: 'flex', gap: '10px' }}>
      <FilterInput />
      <FilterButton handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <FilterForm handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

const FilterInput = () => {
  const styles = useStyles();
  return (
    <TextField
      className={styles.searchTextField}
      fullWidth
      size='small'
      placeholder='Search campaigns'
      data-cy='select-search-text'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Icon name='search-lens' />
          </InputAdornment>
        ),
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') {
          // Prevents autoselecting item while typing (default Select behaviour)
          e.stopPropagation();
        }
      }}
    />
  );
};

const FilterButton = ({ handleOpen }: PFilterBtn) => {
  return (
    <Button
      variant='outlined'
      startIcon={<Icon name='filter' />}
      style={{
        borderRadius: '24px',
        paddingLeft: '24px',
        paddingRight: '24px',
        color: 'gray',
        borderColor: 'gray',
      }}
      onClick={handleOpen}
    >
      Filters
    </Button>
  );
};

const FilterForm = ({ handleClose }: any) => {
  return (
    <Box sx={style}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Filters
        </Typography>
        <Box onClick={handleClose}>
          <Icon name='close' />
        </Box>
      </Box>
      <ModalForm handleClose={handleClose} />
    </Box>
  );
};

interface FormCreateAdvertisement {
  requesters: string[];
}

interface IModalForm {
  handleClose: () => void;
}

const ModalForm = ({ handleClose }: IModalForm) => {
  const initialValues = {
    requesters: [],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  const config: FormikConfig<FormCreateAdvertisement> = {
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      // TODO Need to enable this when the booking form is there
      // setCurrentStep((prevStep) => prevStep + 1);
      console.log('values', values);
    },
  };
  return (
    <Formik {...config}>
      {({ handleReset, submitForm, values, setValues }) => (
        <Form
          style={{
            display: 'contents',
          }}
        >
          <Grid container rowSpacing={1} spacing={3} alignItems={'center'}>
            <Grid item xs={12} md={4}>
              <Typography>Requester</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                name='requesters'
                items={RequestersItems}
                multiSelect
                search
                component={FormikSelect}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Advertisement Type</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                name='advertisementType'
                items={RequestersItems}
                multiSelect
                search
                component={FormikSelect}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Agency Contact</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                name='agencyContact'
                items={RequestersItems}
                multiSelect
                search
                component={FormikSelect}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Status</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                name='status'
                items={RequestersItems}
                multiSelect
                search
                component={FormikSelect}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Organization</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                name='organization'
                items={RequestersItems}
                multiSelect
                search
                component={FormikSelect}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>PO Number</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field name='poNumber' component={FormikTextField} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Publication</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                name='publication'
                items={RequestersItems}
                multiSelect
                search
                component={FormikSelect}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Date Range</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
              >
                <Field
                  placeholder='10,000'
                  name='dateStart'
                  component={FormikDateInput}
                />
                <Typography>-</Typography>
                <Field
                  placeholder='10,000'
                  name='dateEnd'
                  component={FormikDateInput}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>Budget</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
              >
                <Field
                  placeholder='10,000'
                  name='budgetStart'
                  adornment='USD'
                  component={FormikCurrencyInput}
                />
                <Typography>-</Typography>
                <Field
                  placeholder='10,000'
                  name='budgetEnd'
                  adornment='USD'
                  component={FormikCurrencyInput}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                paddingTop: '10px',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button
                variant='text'
                style={{ borderRadius: '24px' }}
                // onClick={() => setValues({ requesters: [] })}
                onClick={handleReset}
              >
                <Icon name='close' />
                <Typography style={{ color: 'black' }}>Clear All</Typography>
              </Button>
              <Box style={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleClose}
                  style={{ borderRadius: '24px' }}
                >
                  Close
                </Button>
                <Button
                  variant='contained'
                  style={{ borderRadius: '24px', background: 'red' }}
                  type='submit'
                  onClick={() => console.log('values', values)}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
