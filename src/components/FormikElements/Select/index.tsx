import React from 'react';
import Select, { ItemProps } from '../../common/Select';
import { FieldProps } from 'formik';

interface FormikSelectProps extends FieldProps {
  label: string;
  dataTestId?: string;
  items: ItemProps[];
  multiSelect?: boolean;
  search?: boolean;
}

const FormikSelect = ({
  label,
  multiSelect,
  search,
  field,
  form,
  items,
}: FormikSelectProps) => {
  const errorText = (
    form.touched?.[field?.name] && form.errors?.[field?.name]
      ? form.errors?.[field?.name]
      : ''
  ) as string;

  const handleChange = (values: string[]) => {
    form.setFieldValue(field.name, values);
  };

  return (
    <Select
      label={label}
      defaultSelected={field.value}
      items={items}
      helperText={errorText}
      error={Boolean(errorText)}
      handleChange={handleChange}
      multiSelect={multiSelect}
      search={search}
      disabled={form.isSubmitting}
      {...field}
    />
  );
};

export default FormikSelect;
