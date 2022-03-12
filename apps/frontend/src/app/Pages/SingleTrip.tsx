import * as React from 'react';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import {
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Autocomplete,
} from '@mui/material';
import { Add, Delete, Directions, Menu, Search } from '@mui/icons-material';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useQuery } from 'react-query';
import { ITrip } from '../Components/TripNameDialog';
import axios from 'axios';
import { useParams } from 'react-router';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { IDestination } from './Home';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VzaGFuc2hha3lhIiwiYSI6ImNreHNxbWEzbDJjNHYyb2tveWs2dWJ1Y2QifQ.hduTJTq1uzs51_XTQQ8CXA';

interface ITrips {
  days: IDays[];
}

interface IDays {
  _id: string;
  title: string;
  description: string;
  destination: IDestination;
}
const SingleTrip = () => {
  const { id } = useParams();

  const { data: singleTripData } = useQuery<ITrip>('singletrip', () =>
    axios.get(`api/trip/${id}`).then((res) => res.data)
  );

  console.log(singleTripData);

  const { control } = useForm<ITrips>();
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
  const mapRef = React.useRef<any>();
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
      {/* <div style={{ height: '100vh' }}>
        <Map
          ref={mapRef}
          {...viewport}
          style={{ width: '100%', height: '100%' }}
          onMove={handleViewportChange}
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
        </Map>
      </div> */}

      <Map
        initialViewState={{
          longitude: 85.3205817,
          latitude: 27.708317,
          zoom: 12,
        }}
        style={{ width: '100%', height: '680px' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      ></Map>
      <Grid
        container
        spacing={2}
        sx={{
          // position: 'absolute',
          zIndex: 9999,
          top: 90,
          left: 20,
          width: '500px',
        }}
      >
        <Card>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              <Typography variant="h4" align="left">
                {singleTripData?.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() =>
                  append({
                    title: '',
                    description: '',
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
                <Card
                  sx={{
                    padding: '25px',
                    borderRadius: '14px',
                    my: '12px',
                    // background: 'url(../images/blurry-gradient-haikei.png)',
                  }}
                  key={field._id}
                  elevation={0}
                >
                  <CardHeader
                    title={`Day ${index + 1} `}
                    action={
                      <IconButton onClick={() => remove(index)}>
                        <Delete />
                      </IconButton>
                    }
                  />
                  <CardContent>
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
                            options={destinationData}
                            getOptionLabel={(option) => option.imgAlt}
                            freeSolo
                            sx={{ width: 300 }}
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
                        name={`days.${index}.destination`}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default SingleTrip;
