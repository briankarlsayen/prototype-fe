import React from 'react';
import DateInput from '../../common/DateInput';

const FormikDateInput = ({
  field,
  placeholder,
  label,
  addon,
  type,
  form,
  dataTestId,
  ...rest
}: any) => {
  const errorText = (
    form.touched?.[field?.name] && form.errors?.[field?.name]
      ? form.errors?.[field?.name]
      : ''
  ) as string;
  const onValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('event', event);
    form.setFieldValue(field.name, event);
  };
  // console.log('rest', rest);
  // console.log('onValueChange', onValueChange);
  return (
    <DateInput
      variant='outlined'
      fullWidth
      placeholder={placeholder}
      label={label}
      error={Boolean(errorText)}
      helperText={errorText}
      onValueChange={onValueChange}
      disabled={form.isSubmitting}
      {...field}
    />
  );
};

export default FormikDateInput;
