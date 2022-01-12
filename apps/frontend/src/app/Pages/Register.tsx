import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, IconButton, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ControlledPasswordField from '../ControlledComponent/ControlledPasswordField';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { useAuthentication } from '../useAuthentication/useAuthentication';

interface IRegisterInputs {
  firstName: string;
  lastName: string;
  userName: string;
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
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IRegisterInputs>();
  const { authState } = useAuthentication();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    axios.post('api/auth/register', data).then(() => {
      console.log('user registered!');
      navigate('/login');
    });
  };
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const password = useRef({});
  password.current = watch('password');

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
          backgroundImage: 'url(https://source.unsplash.com/random)',
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
              marginTop: 8,
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
              sx={{ mt: 3 }}
            >
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
                    label="First Name"
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
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    error={!!errors.userName}
                    helperText={errors.userName && errors.userName.message}
                    control={control}
                    name="userName"
                    rules={{ required: 'User Name is required' }}
                    label="User Name"
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
                    rules={{ required: 'Phone Number is required' }}
                    label="Phone Number"
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
                    rules={{ required: 'Email is required' }}
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledPasswordField
                    Component={RedditTextField}
                    size="small"
                    fullWidth
                    label="Password"
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
                    label="Confirm Password"
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    }}
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disableElevation
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="../login">Already have an account? Sign in</Link>
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
