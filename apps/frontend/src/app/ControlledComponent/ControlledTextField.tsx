import { TextFieldProps, TextField } from '@mui/material';
import {
  FieldValues,
  FieldPath,
  ControllerProps,
  Controller,
} from 'react-hook-form';

export type ControlledTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = TextFieldProps & Omit<ControllerProps<TFieldValues, TName>, 'render'>;

export function ControlledTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  rules,
  name,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <TextField {...props} {...field} />}
    />
  );
}

export default ControlledTextField;
