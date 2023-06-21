import { FieldProps } from 'formik';
// import { SpelInputCustomEvent } from '../../../temp_spel_libs/@kinesso/splash-elements';
import TextField from '../../common/TextField';

interface FormikTextFieldProps extends FieldProps {
  isRequired: boolean;
  placeholder?: string;
  label?: string;
  dataTestId?: string;
  type: string;
}

const FormikTextField = ({
  field,
  placeholder,
  label,
  type,
  form,
  dataTestId,
  ...rest
}: FormikTextFieldProps) => {
  const errorText = (
    form.touched?.[field?.name] && form.errors?.[field?.name]
      ? form.errors?.[field?.name]
      : ''
  ) as string;

  const onValueChange = (event: any) => {
    console.log('click');
    form.setFieldValue(field.name, event.detail.value);
  };

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      helperText={errorText}
      error={Boolean(errorText)}
      onValueChange={onValueChange}
      disabled={form.isSubmitting}
      {...field}
    />
  );
};

export default FormikTextField;
