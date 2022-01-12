import { TextField, TextFieldProps } from '@mui/material';
import { ComponentType } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

export type ControlledTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = TextFieldProps &
  Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  ControlledTextFieldOwnProps;

export interface ControlledTextFieldOwnProps {
  Component?: ComponentType<TextFieldProps>;
}

export function ControlledTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  rules,
  name,
  Component = TextField,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <Component {...props} {...field} />}
    />
  );
}

export default ControlledTextField;
