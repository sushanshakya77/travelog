import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Zoom,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { useAuthentication } from '../useAuthentication/useAuthentication';

export interface SimpleDialogFormProps {
  form: boolean;
  handleFormClose: () => void;
}

interface IFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = ({ form, handleFormClose }: SimpleDialogFormProps) => {
  const { user, token } = useAuthentication();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('Succesfully updated!', {
      variant: 'success',
      autoHideDuration: 3000,
    });
  };
  const onSubmit: SubmitHandler<IFormData> = async ({
    confirmPassword,
    ...rest
  }) => {
    setLoading(true);
    await axios
      .patch(`/api/userInfo/reset/${user._id}`, rest, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        handleFormClose();
        handleClick();
        reset();
        setHasError(false);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const password = useRef({});
  password.current = watch('password');

  return (
    <div>
      <Dialog
        maxWidth="md"
        onClose={handleFormClose}
        aria-labelledby="simple-dialog-title"
        open={form}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id="simple-dialog-title"
            sx={{ backgroundColor: '#3F51B5', color: 'white' }}
          >
            Change Password
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column">
              <Grid item>
                <Collapse in={hasError}>
                  <Zoom in={hasError}>
                    <Alert severity="error">
                      Old Password is not correct. Please try again.
                    </Alert>
                  </Zoom>
                </Collapse>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Old Password"
                  autoFocus
                  margin="dense"
                  {...register('oldPassword', {
                    required: 'Old Password is required',
                  })}
                  type={showOldPassword ? 'text' : 'password'}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                        >
                          {showOldPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="New Password"
                  margin="dense"
                  fullWidth
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'New Password is required',
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                        >
                          {showNewPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="Confirm Password"
                  margin="dense"
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
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
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Confirm'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default ResetPassword;
