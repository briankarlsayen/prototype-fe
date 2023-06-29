import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  OutlinedTextFieldProps,
  InputBaseComponentProps,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
// import { useStyles } from './index.styles';
// import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps extends OutlinedTextFieldProps {
  text?: string;
  label: string | undefined;
  adornment?: string;
  onValueChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CurrencyInput = ({
  text,
  label,
  onValueChange,
  adornment,
  helperText,
  value,
  ...rest
}: CurrencyInputProps) => {
  // const styles = useStyles();

  const [newVal, setVal] = useState('');
  useEffect(() => {
    setVal(value as string);
  }, [value]);

  return (
    <Box>
      <Box>{label}</Box>
      <TextField
        value={newVal}
        {...rest}
        helperText={undefined}
        label={undefined}
        onChange={(e) => {
          onValueChange(e);
        }}
        // InputProps={{
        //   startAdornment: (
        //     <>
        //       {adornment && (
        //         <InputAdornment className={styles.adornment} position="start">
        //           {adornment}
        //         </InputAdornment>
        //       )}
        //     </>
        //   ),
        //   inputComponent: NumericFormatInput
        // }}
      />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

// const NumericFormatInput = React.forwardRef(
//   (
//     { name, onChange, placeholder, inputRef, ...rest }: InputBaseComponentProps,
//     ref
//   ) => {
//     return (
//       <NumericFormat
//         itemRef={inputRef}
//         name={name}
//         placeholder={placeholder}
//         autoComplete="off"
//         onValueChange={(values) => {
//           // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//           onChange?.({
//             target: {
//               name,
//               value: values.value
//             }
//           } as React.ChangeEvent<HTMLInputElement>);
//         }}
//         thousandSeparator
//       />
//     );
//   }
// );

// NumericFormatInput.displayName = 'NumericFormatInput';

export default CurrencyInput;
