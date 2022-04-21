import styled from '@emotion/styled';
import { Edit } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Skeleton,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { IUser } from '../models/User';
import dayjs from 'dayjs';

interface IProps {
  open: boolean;
  handleClose: () => void;
  userInfo: IUser;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProfile({
  open,
  handleClose,
  userInfo,
  setOpen,
}: IProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      username: userInfo.username,
      dob: userInfo.dob,
      currentCity: userInfo.currentCity,
      description: userInfo.description,
    },
  });
  const { refetch } = useQuery<IUser>('userInfo');
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setIsLoading(true);
    await axios
      .patch(`/api/userInfo/${userInfo._id}`, data)
      .then((response) => {
        console.log(response);
        refetch();
        setOpen(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
    <Dialog
      PaperComponent={(props) => (
        <Paper {...(props as never)} component={'form'}></Paper>
      )}
      open={open}
      onClose={handleClose}
      fullWidth
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoading && <LinearProgress />}
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sx={{ mb: '25px', ml: '210px' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <>
                  <IconButton
                    sx={{
                      width: 30,
                      height: 30,
                      border: `2px solid #ffffff`,
                      bgcolor: '#EEEEEE',
                      color: '#222831',
                      transition: '0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: '#222831',
                        color: '#EEEEEE',
                      },
                    }}
                    component="span"
                  >
                    <label htmlFor="icon-button">
                      <input
                        id="icon-button"
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                        name="profilePicture"
                        // style={{ display: 'none' }}
                      />
                      <Edit sx={{ fontSize: '20px' }} />
                    </label>
                  </IconButton>
                </>
              }
            >
              <Avatar
                src=""
                sx={{
                  height: '120px',
                  width: '120px',
                }}
              />
            </Badge>
          </Grid>
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
                label="Username"
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
                error={!!errors.dob}
                type="date"
                helperText={errors.dob && errors.dob.message}
                name="dob"
                defaultValue={dayjs(userInfo.dob).format('YYYY-MM-DD')}
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-map-pin"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#707070"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="11" r="3" />
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                      </svg>
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
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
  );
}
