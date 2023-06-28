import React from 'react';
import { FieldProps } from 'formik';
import CurrencyInput from '../../common/CurrencyInput';

interface FormikCurrencyInputProps extends FieldProps {
  isRequired: boolean;
  placeholder?: string;
  label?: string;
  addon?: string;
  dataTestId?: string;
  type: string;
  adornment?: string;
}

const FormikCurrencyInput = ({
  field,
  placeholder,
  label,
  addon,
  type,
  form,
  dataTestId,
  adornment,
  ...rest
}: FormikCurrencyInputProps) => {
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

  return (
    <CurrencyInput
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

export default FormikCurrencyInput;
