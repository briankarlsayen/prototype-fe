import React from 'react';
// import { SpelInput } from '../../../temp_spel_libs/@kinesso/splash-elements-react';
// import {
//   JSX,
//   SpelInputCustomEvent,
// } from '../../../temp_spel_libs/@kinesso/splash-elements';
import { Box } from '@mui/material';
// import { useStyles } from './index.styles';
import MUITextField from '@mui/material/TextField';

export interface InputProps {
  text?: string;
  onValueChange: (e: any) => void;
}

const TextField = ({ text, onValueChange, ...rest }: any) => {
  // const styles = useStyles();
  // console.log('onValueChange', onValueChange);
  // console.log('rest', rest);
  return (
    <Box>
      {/* <SpelInput
        onValueChange={onValueChange}
        inputProps={{
          autoComplete: 'off',
        }}
        {...rest}
      /> */}
      <MUITextField
        onChange={onValueChange}
        inputProps={{
          autoComplete: 'off',
        }}
        {...rest}
      />
    </Box>
  );
};

export default TextField;
