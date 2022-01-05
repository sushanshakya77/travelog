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
import { Link, Navigate } from 'react-router-dom';
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
    formState: { errors },
  } = useForm<IRegisterInputs>();
  const { authState } = useAuthentication();

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    axios.post('api/auth/register', data).then(() => {
      console.log('user registered!');
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
                  <TextField
                    size="small"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register('firstName', {
                      required: 'firstName is required',
                    })}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register('lastName', {
                      required: 'lastName is required',
                    })}
                    fullWidth
                    size="small"
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    {...register('userName', {
                      required: 'userName is required',
                    })}
                    fullWidth
                    size="small"
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    {...register('phoneNumber', {
                      required: 'phoneNumber is required',
                    })}
                    fullWidth
                    size="small"
                    label="Phone No. "
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', {
                      required: 'email is required',
                    })}
                    fullWidth
                    size="small"
                    label="Email Address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    fullWidth
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    fullWidth
                    size="small"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    {...register('confirmPassword', {
                      required: 'password is required',
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                      minLength: {
                        value: 8,
                        message: 'password must be at least 8 characters',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
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
