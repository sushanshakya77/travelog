import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { ControlledTextFieldProps } from './ControlledTextField';

export function ControlledPasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  rules,
  name,
  Component = TextField,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Component
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...props}
          {...field}
        />
      )}
    />
  );
}

export default ControlledPasswordField;
