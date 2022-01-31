import styled from '@emotion/styled';
import { Edit, Event, Settings } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import EditProfile from '../Components/EditProfile';

const Input = styled.input`
  display: none;
`;

export interface IUserInfo {
  _id: any;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
  currentCity: string;
  description: string;
  profilePicture: string;
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const UserInfo = () => {
  const { data: userInfoData } = useQuery<IUserInfo>('userInfo', () =>
    axios.get('api/userInfo').then((res) => res.data)
  );

  const [open, setOpen] = React.useState(false);
  // const [loading, setloading] = React.useState(true);

  // if (userInfoData) setloading(false);

  const { reset } = useForm<IUserInfo>();

  const handleClickOpen = () => {
    setOpen(true);
    // setEdit(userInfoData);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  console.log('this is ', userInfoData?.createdAt);

  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: 'url(https://wallpaperaccess.com/full/36307.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],

          backgroundSize: 'cover',
          height: '350px',
          backgroundPosition: 'center',
        }}
      />

      <Container maxWidth="lg">
        <Grid>
          <Box
            maxWidth="lg"
            sx={{
              // position: 'fixed',
              margin: 'auto',
              width: '1232px',
              transform: 'translate(0%,-30%)',
              padding: '25px',
              bgcolor: '#fcf0f0',
            }}
            elevation={0}
            component={Paper}
          >
            <Grid container>
              <Grid item xs={1.5}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <IconButton
                        sx={{
                          width: 33,
                          height: 33,
                          border: `2px solid ${theme.palette.background.paper}`,
                          bgcolor: '#EEEEEE',
                          color: '#222831',
                          '&:hover': {
                            bgcolor: '#EEEEEE',
                          },
                        }}
                        component="span"
                      >
                        <Edit />
                      </IconButton>
                    </label>
                  }
                >
                  <Avatar
                    // src={userInfoData?.profilePicture}
                    src="http://images.firstpost.com/wp-content/uploads/2014/02/shrek_380.gif?impolicy=website&width=1200&height=800"
                    // src="https://source.unsplash.com/random"
                    sx={{
                      height: '128px',
                      width: '128px',
                    }}
                  />
                </Badge>
              </Grid>

              <Grid item xs={8.5}>
                {/* {loading ? (
                  <Skeleton animation="wave" />
                ) : ( */}
                <>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      lineHeight: '28px',
                    }}
                  >
                    {userInfoData?.firstName} {userInfoData?.lastName}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '14px',
                      lineHeight: '18px',
                    }}
                  >
                    {userInfoData?.username && `@${userInfoData?.username}`}
                  </Typography>
                </>
                {/* )} */}
              </Grid>

              <Grid item xs={1.4}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="outlined"
                    disableRipple
                    sx={{
                      color: 'black',
                    }}
                    onClick={handleClickOpen}
                  >
                    Edit Profile
                  </Button>
                </ThemeProvider>
                {userInfoData && (
                  <EditProfile
                    open={open}
                    handleClose={handleClose}
                    userInfo={userInfoData}
                    setOpen={setOpen}
                  />
                )}
              </Grid>
              <Grid item xs>
                <IconButton>
                  <Settings />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          <Grid container>
            <Box
              maxWidth="lg"
              elevation={0}
              component={Paper}
              sx={{ padding: '25px' }}
            >
              <Typography sx={{ fontSize: '20px', lineHeight: '50px' }}>
                Intro
              </Typography>
              <Typography sx={{ fontSize: '14px', margin: 'none' }}>
                <Event sx={{ fontSize: '15px' }} /> Joined in{' '}
                {dayjs(userInfoData?.createdAt).format('MMM DD, YYYY')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default UserInfo;
