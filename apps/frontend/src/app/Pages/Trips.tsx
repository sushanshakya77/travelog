import {
  AddCircleOutlineOutlined,
  Delete,
  MoreVert,
} from '@mui/icons-material';
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

const Trips = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { id } = useParams();

  const handleDelete = (id: string) => {
    axios.delete(`api/trip/delete/${id}`).then((res) => res.data);
  };
  const { data: tripData } = useQuery<ITrip[]>(
    'trips',
    async () => await axios.get(`api/trip/user/${id}`).then((res) => res.data)
  );
  console.log(tripData);

  return (
    <div>
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
              <Card sx={{ height: '250px' }}>
                <Link to={`/trip/${trip._id}`}>
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
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {trip.title}
                    <IconButton
                      onClick={() => handleDelete(trip._id)}
                      sx={{ float: 'right' }}
                    >
                      <Delete />
                    </IconButton>
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }} color="text.secondary">
                    {dayjs(trip.createdAt).format('MMMM DD, YYYY')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trip.desc}
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {open && <TripNameDialog open={open} handleClose={handleClose} />}
      </Container>
    </div>
  );
};

export default Trips;
