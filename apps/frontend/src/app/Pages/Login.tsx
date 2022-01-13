import styled from '@emotion/styled';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  OutlinedInputProps,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
  Zoom,
} from '@mui/material';
import { alpha, styled as style } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import ControlledPasswordField from '../ControlledComponent/ControlledPasswordField';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
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
  username: string;
  password: string;
}

export default function Login() {
  const [hasError, setHasError] = useState(false);
  const { authState, setAuthState } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginInputs> = async (data: ILoginInputs) => {
    setIsLoading(true);
    await axios
      .post('api/auth/login', data)
      .then(() => {
        setHasError(false);
        setAuthState('loggedIn');
      })
      .catch(() => {
        setHasError(true);
      })
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
            <Collapse in={hasError}>
              <Zoom in={hasError}>
                <Grid item>
                  <Alert severity="error">
                    username or password was typed incorrectly.
                  </Alert>
                </Grid>
              </Zoom>
            </Collapse>

            <ControlledTextField
              Component={RedditTextField}
              margin="normal"
              fullWidth
              label="username"
              name="username"
              control={control}
              autoFocus
              rules={{ required: 'username is required' }}
              error={!!errors.username}
              helperText={errors.username && errors.username.message}
              style={{ marginTop: 11 }}
            />
            <ControlledPasswordField
              Component={RedditTextField}
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              control={control}
              rules={{ required: 'password is required' }}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              style={{ marginTop: 11 }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In' : 'Sign In'}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="/login">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
