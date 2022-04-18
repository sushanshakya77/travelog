import { AlternateEmail } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Collapse,
  Container,
  InputAdornment,
  Zoom,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ControlledPasswordField from '../ControlledComponent/ControlledPasswordField';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { useAuthentication } from '../useAuthentication/useAuthentication';

// RFC5322 standard email validation
const emailValidationRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const phoneNumberRegex = /^\d{10}$/;

const userNameRegex =
  /^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

interface IRegisterInputs {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      travelog.
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Register() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IRegisterInputs>();
  const [hasError, setHasError] = useState(false);
  const { authState } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterInputs> = (data: IRegisterInputs) => {
    setIsLoading(true);
    const { confirmPassword: _, ...rest } = data;
    axios
      .post('api/auth/register', rest)
      .then(() => {
        navigate('/login');
      })
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (authState === 'loggedIn') return <Navigate to="/" />;
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/user/nasa)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: hasError ? 4 : 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: hasError ? 1 : 3 }}
            >
              <Collapse in={hasError}>
                <Zoom in={hasError}>
                  <Grid item>
                    <Alert severity="error" sx={{ mb: '10px' }}>
                      User Already exists.
                    </Alert>
                  </Grid>
                </Zoom>
              </Collapse>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ControlledTextField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName && errors.firstName.message}
                    control={control}
                    name="firstName"
                    rules={{ required: 'First Name is required' }}
                    label="First Name*"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ControlledTextField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName && errors.lastName.message}
                    control={control}
                    name="lastName"
                    rules={{ required: 'Last Name is required' }}
                    label="Last Name*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username && errors.username.message}
                    control={control}
                    name="username"
                    rules={{
                      pattern: {
                        value: userNameRegex,
                        message: 'Invalid Username',
                      },
                    }}
                    label="User Name*"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={
                      errors.phoneNumber && errors.phoneNumber.message
                    }
                    control={control}
                    name="phoneNumber"
                    rules={{
                      pattern: {
                        value: phoneNumberRegex,
                        message: 'Invalid Phone Number',
                      },
                    }}
                    label="Phone Number*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                    control={control}
                    name="email"
                    rules={{
                      pattern: {
                        value: emailValidationRegex,
                        message: 'Invalid email address',
                      },
                    }}
                    label="Email*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledPasswordField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    label="Password*"
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledPasswordField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    label="Confirm Password*"
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      validate: (value) => {
                        if (value !== control._formValues['password']) {
                          return 'Passwords must match';
                        }
                        return undefined;
                      },
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    }}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disableElevation
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up' : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>{' '}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Grid>
    </Grid>
  );
}
