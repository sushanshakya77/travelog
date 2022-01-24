import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box, Grid, InputAdornment } from '@mui/material';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserInfo } from '../Pages/UserInfo';
import axios from 'axios';

interface IProps {
  open: boolean;
  handleClose: () => void;
  userInfo: IUserInfo | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface IEditInputs {
//   firstName: string;
//   lastName: string;
//   username: string;
//   currentCity: string;
//   description: string;
// }

export default function EditProfile({
  open,
  handleClose,
  userInfo,
  setOpen,
}: IProps) {
  // console.log('this is userInfo:', userInfo?.firstName);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUserInfo>({
    defaultValues: {
      firstName: userInfo?.firstName ?? undefined,
      lastName: userInfo?.lastName ?? undefined,
      username: userInfo?.username ?? undefined,
      currentCity: userInfo?.currentCity ?? undefined,
      description: userInfo?.description ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<IUserInfo> = async (data) => {
    console.log(data?._id);
    await axios.patch(`/api/userInfo/${data._id}`, data).then((response) => {
      console.log(response);
      setOpen(false);
      reset();
    });
  };

  const props = React.useMemo<Record<string, unknown>>(
    () => ({
      size: 'small',
      fullWidth: true,
      control,
    }),
    []
  );
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container>
            {/* <Grid item xs={12} sm={6}>
              <Avatar
                src="http://images.firstpost.com/wp-content/uploads/2014/02/shrek_380.gif?impolicy=website&width=1200&height=800"
                sx={{
                  height: '120px',
                  width: '120px',
                }}
              />
            </Grid> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ControlledTextField
                  Component={RedditTextField}
                  error={!!errors.firstName}
                  helperText={errors.firstName && errors.firstName.message}
                  name="firstName"
                  rules={{ required: 'First Name is required' }}
                  label="First Name"
                  autoFocus
                  {...props}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ControlledTextField
                  Component={RedditTextField}
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                  name="lastName"
                  rules={{ required: 'Last Name is required' }}
                  label="Last Name"
                  {...props}
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextField
                  Component={RedditTextField}
                  error={!!errors.username}
                  helperText={errors.username && errors.username.message}
                  name="username"
                  rules={{ required: 'User Name is required' }}
                  label="User Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  {...props}
                />
              </Grid>

              <Grid item xs={12}>
                <ControlledTextField
                  Component={RedditTextField}
                  error={!!errors.currentCity}
                  helperText={errors.currentCity && errors.currentCity.message}
                  name="currentCity"
                  label="Current City"
                  {...props}
                />
              </Grid>
              <Grid item xs={12}>
                <ControlledTextField
                  Component={RedditTextField}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description && errors.description.message}
                  control={control}
                  name="description"
                  rules={{ required: 'Last Name is required' }}
                  label="Description"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
