import styled from '@emotion/styled';
import { Add, Delete, MoreVert, PersonPinSharp } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import mapboxgl, { FreeCameraOptions } from 'mapbox-gl';
import * as React from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Map, {
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
  ViewState,
} from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { ISubDestination } from '../models/Destination';
import { ITrip } from '../models/Trips';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VzaGFuc2hha3lhIiwiYSI6ImNreHNxbWEzbDJjNHYyb2tveWs2dWJ1Y2QifQ.hduTJTq1uzs51_XTQQ8CXA';

const StyledCard = styled(Grid)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const SingleTrip = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setopenDialog] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: singleTripData, refetch: tripDataRefetch } = useQuery<ITrip>(
    'singletrip',
    () => axios.get(`api/trip/${id}`).then((res) => res.data)
  );
  const {
    control,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITrip>();

  const onSubmit: SubmitHandler<ITrip> = async (data) => {
    console.log(data);
    await axios.patch(`/api/trip/update/${id}`, data).then((res) => {
      setopenDialog(false);

      console.log(res);
      tripDataRefetch();
    });
  };

  const { fields, append, remove } = useFieldArray({
    name: 'days',
    control,
  });
  const { data: subDestinationData } = useQuery<ISubDestination[]>(
    'subDestinations',
    () => axios.get('api/subDestinations').then((res) => res.data)
  );
  console.log(singleTripData?.days);
  const [viewState, setViewState] = React.useState({
    longitude: 85.3205817,
    latitude: 27.708317,
    zoom: 12,
  });
  const [popup, setPopup] = React.useState(false);

  return (
    <div>
      <Grid container sx={{ position: 'relative' }}>
        <Map
          initialViewState={viewState}
          // {...viewState}
          style={{ width: '100%', height: '100vh' }}
          mapStyle="mapbox://styles/sushanshakya/ckxsqv4o81jau14nu0137rm5v"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl />
          <GeolocateControl />

          {(singleTripData?.days?.length ?? []) > 0
            ? singleTripData?.days?.map((day, index) => (
                <Marker
                  key={day._id}
                  longitude={day.destination.longitude ?? 0}
                  latitude={day.destination.latitude ?? 0}
                  anchor="bottom"
                  style={{
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setPopup(true);
                  }}
                ></Marker>
              ))
            : watch('days')?.map((day, index) => (
                <Marker
                  key={day._id}
                  longitude={day?.destination?.longitude ?? 0}
                  latitude={day?.destination?.latitude ?? 0}
                />
              ))}
        </Map>
        <StyledCard
          item
          xs={6}
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 99,
            width: '100%',
            padding: '24px',
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <div style={{ flexGrow: 1 }} />
                {singleTripData?.title}
                <div style={{ flexGrow: 1 }} />
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setopenDialog(true);
                      handleClose();
                    }}
                  >
                    Edit Trip
                  </MenuItem>
                </Menu>
              </Typography>
            </Grid>
            <Dialog
              open={openDialog}
              maxWidth="md"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Trip Status</DialogTitle>
              <DialogContent>
                <Controller
                  render={({ field }) => (
                    <RedditTextField
                      label="Categories"
                      fullWidth
                      select
                      {...field}
                    >
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
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setopenDialog(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">
                  Edit
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ display: 'flex', justifyContent: 'center', mt: '5px' }}
              >
                {singleTripData?.desc}
              </Typography>
            </Grid>
          </Grid>

          {(singleTripData?.days?.length ?? []) > 0 ? (
            <div style={{ maxHeight: '500px', overflow: 'auto' }}>
              {singleTripData?.days?.map((day, index) => (
                <Grid container xs={12} key={day._id}>
                  <Grid item xs={12}>
                    <Toolbar>
                      <Typography variant="h6">Day {index + 1}</Typography>
                      <div style={{ flexGrow: 1 }} />
                    </Toolbar>
                  </Grid>
                  <StyledCard sx={{ width: '700px' }}>
                    <CardHeader
                      title={day.title}
                      titleTypographyProps={{ fontSize: '28px' }}
                    />
                    <CardContent>
                      <Typography variant="body1">{day.description}</Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </div>
          ) : (
            <Grid
              container
              xs={12}
              sx={{ maxHeight: '450px', overflow: 'auto', mt: '20px' }}
            >
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() =>
                    append({
                      title: '',
                      description: '',
                      destination: undefined,
                    })
                  }
                  startIcon={<Add />}
                  disableRipple
                  disableElevation
                >
                  Add Days{' '}
                </Button>
              </Grid>
              {fields.map((field, index) => (
                <Grid item xs={12} spacing={2} key={field.id}>
                  <Toolbar>
                    <Typography variant="h6">Day {index + 1}</Typography>

                    <div style={{ flexGrow: 1 }} />
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                  </Toolbar>
                  <RedditTextField
                    value={index + 1}
                    fullWidth
                    {...register(`days.${index}.number`)}
                    sx={{ display: 'none' }}
                  />
                  <ControlledTextField
                    Component={RedditTextField}
                    name={`days.${index}.title`}
                    label="Title"
                    rules={{ required: 'Title is required' }}
                    fullWidth
                    control={control}
                    error={!!errors.days?.[index]?.title}
                    helperText={
                      errors.days?.[index]?.title &&
                      errors.days?.[index]?.title?.message
                    }
                  />
                  <ControlledTextField
                    Component={RedditTextField}
                    name={`days.${index}.description`}
                    fullWidth
                    label="Description"
                    multiline
                    rules={{ required: 'Description is required' }}
                    rows={4}
                    sx={{ my: '12px' }}
                    control={control}
                    error={!!errors.days?.[index]?.description}
                    helperText={
                      errors.days?.[index]?.description &&
                      errors.days?.[index]?.description?.message
                    }
                  />
                  {subDestinationData && (
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={subDestinationData ?? []}
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => (
                            <RedditTextField
                              {...params}
                              label="Search"
                              fullWidth
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
                      name={`days.${index}.destination`}
                    />
                  )}
                </Grid>
              ))}
              <Grid item xs={12}>
                {fields.length !== 0 && (
                  <Button
                    type="submit"
                    sx={{ float: 'right' }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
        </StyledCard>
      </Grid>
    </div>
  );
};

export default SingleTrip;
