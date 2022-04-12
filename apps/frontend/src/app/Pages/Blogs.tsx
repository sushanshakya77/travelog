import { Add } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fab,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Outlet } from 'react-router';
import { Categories, IBlog } from '../models/Blogs';

const Blogs = () => {
  return (
    <div>
      <Grid container>
        <Grid container style={{ position: 'relative' }}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1649323272644-a8704b0ee20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=903&q=80)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],

              backgroundSize: 'cover',
              height: '350px',
              backgroundPosition: 'center',
              filter: 'brightness(50%)',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              color: 'white',
              top: '20%',
              left: '32%',
            }}
          >
            travelog. blog
          </Typography>
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              color: 'white',
              top: '55%',
              left: '36%',
              // fontSize: '25px',
            }}
          >
            stories from the travellers of the world.
          </Typography>
        </Grid>
        <Outlet />
      </Grid>
    </div>
  );
};

export default Blogs;
