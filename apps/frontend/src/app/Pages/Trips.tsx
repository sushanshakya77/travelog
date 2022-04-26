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
import TripNameDialog from '../Components/TripNameDialog';
import dayjs from 'dayjs';
import { ITrip, Status } from '../models/Trips';

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
    axios.delete(`api/trip/delete/${id}`).then(() => tripRefetch());
  };
  const { data: tripData, refetch: tripRefetch } = useQuery<ITrip[]>(
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
                    image="https://source.unsplash.com/collection/4854228/nepal"
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
                    {trip.status === Status.Public ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-world"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="3.6" y1="9" x2="20.4" y2="9" />
                        <line x1="3.6" y1="15" x2="20.4" y2="15" />
                        <path d="M11.5 3a17 17 0 0 0 0 18" />
                        <path d="M12.5 3a17 17 0 0 1 0 18" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-lock"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#fc1313"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <circle cx="12" cy="16" r="1" />
                        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                      </svg>
                    )}
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
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
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
