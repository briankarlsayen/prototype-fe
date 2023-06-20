import React from 'react';
import { SpelInput } from '../../../temp_spel_libs/@kinesso/splash-elements-react';
import {
  JSX,
  SpelInputCustomEvent,
} from '../../../temp_spel_libs/@kinesso/splash-elements';
import { Box } from '@mui/material';
import { useStyles } from './index.styles';

export interface InputProps extends JSX.SpelInput {
  text?: string;
  onValueChange: (e: SpelInputCustomEvent<HTMLInputElement>) => void;
}

const TextField = ({ text, onValueChange, ...rest }: InputProps) => {
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      <SpelInput
        onValueChange={onValueChange}
        inputProps={{
          autoComplete: 'off',
        }}
        {...rest}
      />
    </Box>
  );
};

export default TextField;
