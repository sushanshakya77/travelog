import styled from '@emotion/styled';
import { Add, Delete } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { IDestination, ISubDestination } from '../models/Destination';
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

  const { data: singleTripData, refetch: tripDataRefetch } = useQuery<ITrip>(
    'singletrip',
    () => axios.get(`api/trip/${id}`).then((res) => res.data)
  );

  const { control, watch, handleSubmit, register } = useForm<ITrip>();
  const onSubmit: SubmitHandler<ITrip> = async (data) => {
    console.log(data);
    await axios.patch(`/api/trip/update/${id}`, data).then((res) => {
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
          mapStyle="mapbox://styles/sushanshakya/ckxsqv4o81jau14nu0137rm5v"
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={false}
          scrollZoom={true}
        >
          <NavigationControl />
          <GeolocateControl />
          {singleTripData?.days?.map((day, index) => (
            <Marker
              longitude={day?.destination?.longitude ?? 85.3205817}
              latitude={day?.destination?.latitude ?? 27.708317}
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

          {(singleTripData?.days?.length ?? []) > 0 ? (
            <div>
              {singleTripData?.days?.map((day, index) => (
                <Grid container xs={12} key={day._id}>
                  <Grid item xs={12}>
                    <Toolbar>
                      <Typography variant="h6">Day {index + 1}</Typography>
                      <div style={{ flexGrow: 1 }} />
                      <IconButton onClick={() => remove(index)}>
                        <Delete />
                      </IconButton>
                    </Toolbar>
                  </Grid>
                  <StyledCard sx={{ width: '600px' }}>
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
              sx={{ maxHeight: '450px', overflow: 'auto' }}
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
