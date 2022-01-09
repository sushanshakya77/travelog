import { VisibilityOff, Visibility } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { FieldValues, FieldPath, Controller } from 'react-hook-form';
import { ControlledTextFieldProps } from './ControlledTextField';

export function ControlledPasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  rules,
  name,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
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
        />
      )}
    />
  );
}

export default ControlledPasswordField;
