import styled from '@emotion/styled';
import { Add, Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Map, {
  AttributionControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { IDestination } from '../models/Destination';
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

  const { data: singleTripData } = useQuery<ITrip>('singletrip', () =>
    axios.get(`api/trip/${id}`).then((res) => res.data)
  );

  const { control, watch, handleSubmit } = useForm<ITrip>();
  const onSubmit: SubmitHandler<ITrip> = async (data) => {
    console.log(data);
    await axios.patch(`/api/trip/update/${id}`, data).then((res) => {
      console.log(res);
    });
  };

  const { fields, append, remove } = useFieldArray({
    name: 'days',
    control,
  });
  const { data: destinationData } = useQuery<IDestination[]>(
    'destinations',
    () => axios.get('api/destinations').then((res) => res.data)
  );

  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const handleViewportChange = React.useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = React.useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div>
      <Grid container sx={{ position: 'relative' }}>
        <Map
          initialViewState={{
            longitude: 85.3205817,
            latitude: 27.708317,
            zoom: 12,
          }}
          style={{ width: '100%', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={false}
          scrollZoom={true}
        >
          <NavigationControl />
          <GeolocateControl />
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
                {singleTripData?.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {singleTripData?.desc}
              </Typography>
            </Grid>
          </Grid>

          <Grid container xs={12} sx={{ maxHeight: '450px', overflow: 'auto' }}>
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
            <Grid item xs={12} spacing={2}>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <Toolbar>
                    <Typography variant="h6">Day {index + 1}</Typography>
                    <ControlledTextField
                      Component={RedditTextField}
                      defaultValue={index + 1}
                      name={`days.${index}.number`}
                      control={control}
                      sx={{ display: 'none' }}
                    ></ControlledTextField>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                  </Toolbar>

                  <ControlledTextField
                    Component={RedditTextField}
                    name={`days.${index}.title`}
                    label="Title"
                    fullWidth
                    control={control}
                  />
                  <ControlledTextField
                    Component={RedditTextField}
                    name={`days.${index}.description`}
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    sx={{ my: '12px' }}
                    control={control}
                  />
                  {destinationData && (
                    <Controller
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={destinationData ?? []}
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
                </div>
              ))}
            </Grid>
          </Grid>
          {fields.length !== 0 && (
            <Button
              type="submit"
              sx={{ float: 'right' }}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          )}
        </StyledCard>
      </Grid>
    </div>
  );
};

export default SingleTrip;
