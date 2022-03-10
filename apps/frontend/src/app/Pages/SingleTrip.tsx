import * as React from 'react';
import Map, { Layer } from 'react-map-gl';
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
} from '@mui/material';
import { Add, Directions, Menu, Search } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { ITrip } from '../Components/TripNameDialog';
import axios from 'axios';
import { useParams } from 'react-router';
import ControlledTextField from '../ControlledComponent/ControlledTextField';
import { RedditTextField } from '../ControlledComponent/RedditTextField';
import { useForm } from 'react-hook-form';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VzaGFuc2hha3lhIiwiYSI6ImNreHNxbWEzbDJjNHYyb2tveWs2dWJ1Y2QifQ.hduTJTq1uzs51_XTQQ8CXA';
const SingleTrip = () => {
  const { id } = useParams();

  const { data: singleTripData } = useQuery<ITrip>('singletrip', () =>
    axios.get(`api/trip/${id}`).then((res) => res.data)
  );

  console.log(singleTripData);

  const { control } = useForm<ITrip>();

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 85.333336,
          latitude: 27.700001,
          zoom: 12,
        }}
        style={{ width: '100%', height: '370px' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      ></Map>

      {/* <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          zIndex: 9999,
          position: 'absolute',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <Menu />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add a place"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <Directions />
        </IconButton>
      </Paper> */}
      <Container maxWidth="lg" sx={{ mt: '24px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="left">
              {singleTripData?.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" startIcon={<Add />}>
              Add First Destination{' '}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              Component={RedditTextField}
              name="title"
              control={control}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SingleTrip;
