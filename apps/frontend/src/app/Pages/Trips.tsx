import { AddCircleOutlineOutlined, MoreVert } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import Map from 'react-map-gl';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import TripNameDialog, { ITrip } from '../Components/TripNameDialog';
import dayjs from 'dayjs';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3VzaGFuc2hha3lhIiwiYSI6ImNreHNxbWEzbDJjNHYyb2tveWs2dWJ1Y2QifQ.hduTJTq1uzs51_XTQQ8CXA';
const Trips = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { id } = useParams();
  const { data: tripData } = useQuery<ITrip[]>('trips', () =>
    axios.get(`api/trip/user/${id}`).then((res) => res.data)
  );
  console.log(tripData);

  return (
    <div>
      {/* <Map
        initialViewState={{
          longitude: 85.333336,
          latitude: 27.700001,
          zoom: 12,
        }}
        style={{ width: '100%', height: '670px' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      /> */}
      <Typography variant="h4" align="center">
        Trips
      </Typography>
      <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              sx={{
                height: '250px',
                width: '100%',
                '$:hover': { backgroundColor: '#00ADB5' },
                borderRadius: '10px',
              }}
              disableElevation
              disableRipple
              variant="contained"
              onClick={handleClickOpen}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <AddCircleOutlineOutlined />
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    py: '100px',
                    textTransform: 'none',
                    ml: '5px',
                    lineHeight: '1.2',
                  }}
                >
                  Create a Trip
                </Typography>
              </div>
            </Button>
          </Grid>
          {tripData?.map((trip) => (
            <Grid item xs={12} sm={6} md={4}>
              <Link to={`/trip/${trip._id}`}>
                <Card sx={{ height: '250px' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="green iguana"
                    sx={{
                      backgroundSize: 'cover',
                      height: '120px',
                      backgroundPosition: 'center',
                    }}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {trip.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {dayjs(trip.createdAt).format('MMMM DD, YYYY')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {trip.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        <TripNameDialog open={open} handleClose={handleClose} />
      </Container>
    </div>
  );
};

export default Trips;
