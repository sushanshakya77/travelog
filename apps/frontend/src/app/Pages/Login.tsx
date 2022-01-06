import styled from '@emotion/styled';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAuthentication } from '../useAuthentication/useAuthentication';

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

const StyledBox = styled(Box)`
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

interface ILoginInputs {
  userName: string;
  password: string;
}

export default function Login() {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const { authState, setAuthState } = useAuthentication();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    axios
      .post('api/auth/login', data)
      .then((res) => {
        console.log(res);
        setAuthState('loggedIn');
      })
      .catch((err) => console.log(err));
    console.log(data);
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
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'gray' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              {...register('userName', {
                required: 'userName is required',
              })}
              autoFocus
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Password"
              fullWidth
              margin="dense"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="login">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="../register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
