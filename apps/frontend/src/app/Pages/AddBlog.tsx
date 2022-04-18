import {
  Autocomplete,
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { IBlog, Tags } from '../models/Blogs';
import { IDestination } from '../models/Destination';
import { Roles } from '../models/User';
import { useAuthentication } from '../useAuthentication/useAuthentication';

const AddBlog = () => {
  const { control, handleSubmit, register } = useForm<IBlog>();
  const { user } = useAuthentication();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<IBlog> = async (data) => {
    await axios.post('/api/blogs', data).then((res) => {
      navigate('/blogs');
      enqueueSnackbar('Blog successfully added!', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    });
  };
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} md={6}>
          <ControlledTextField
            Component={RedditTextField}
            name="title"
            label="Title"
            control={control}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlledTextField
            Component={RedditTextField}
            name="image"
            label="Images(Link or Upload)"
            control={control}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-camera-plus"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="13" r="3" />
                    <path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                    <line x1="15" y1="6" x2="21" y2="6" />
                    <line x1="18" y1="3" x2="18" y2="9" />
                  </svg>
                </IconButton>
              ),
            }}
          />
        </Grid>
        {user?.role === Roles.ADMIN && (
          <Grid item xs={12}>
            <Controller
              render={({ field }) => (
                <RedditTextField label="Categories" fullWidth select {...field}>
                  {['Featured', 'Popular'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RedditTextField>
              )}
              name="categories"
              control={control}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          {destinationData && (
            <Controller
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={destinationData}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <RedditTextField
                      {...params}
                      label="Search"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'disabled',
                      }}
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
              control={control}
              name="destination"
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            render={({ field }) => (
              <RedditTextField label="Categories" fullWidth select {...field}>
                {['Public', 'Private'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RedditTextField>
            )}
            name="status"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                fullWidth
                options={Object.values(Tags)}
                renderInput={(params) => (
                  <RedditTextField
                    {...params}
                    label="Tags"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'disabled',
                    }}
                  />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
            control={control}
            name="tags"
          />
        </Grid>
        <Grid item xs={12}>
          <ControlledTextField
            Component={RedditTextField}
            name="description"
            label="Description"
            control={control}
            multiline
            fullWidth
            rows={18}
          />
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ float: 'right' }} onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddBlog;
