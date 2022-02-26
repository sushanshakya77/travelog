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
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import AddProfile from '../Components/AddProfile';
import EditProfile from '../Components/EditProfile';

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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserInfo = () => {
  const { data: userInfoData } = useQuery<IUserInfo>('userInfo', () =>
    axios.get('api/userInfo').then((res) => res.data)
  );
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  //add skeleton loading
  const [loading, setLoading] = useState(false);

  const { reset } = useForm<IUserInfo>();

  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  console.log('this is ', userInfoData?.createdAt);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundImage: 'url(https://wallpaperaccess.com/full/959294.jpg)',
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

      <Container maxWidth="lg" sx={{ transform: 'translate(0%,-30%)' }}>
        <Grid container spacing={2}>
          <Grid container item>
            <Box
              maxWidth="lg"
              sx={{
                margin: 'auto',
                width: '100%',
                padding: '25px',
                pb: '0px',
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
                        onClick={handleClickOpenProfile}
                        component="span"
                      >
                        <Edit />
                      </IconButton>
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
                {userInfoData && (
                  <AddProfile
                    openProfile={openProfile}
                    handleCloseProfile={handleCloseProfile}
                    userInfo={userInfoData}
                  />
                )}
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
                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        centered
                      >
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Followers" {...a11yProps(1)} />
                        <Tab label="Following" {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid container item>
            <Grid item xs={2.5}>
              <Box
                elevation={0}
                component={Paper}
                maxWidth="sm"
                sx={{ padding: '25px' }}
              >
                <Typography sx={{ fontSize: '20px', lineHeight: '40px' }}>
                  Intro
                </Typography>
                <Typography sx={{ fontSize: '14px', margin: 'none' }}>
                  <Event sx={{ fontSize: '15px' }} /> Joined in{' '}
                  {dayjs(userInfoData?.createdAt).format('MMM DD, YYYY')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9.5}>
              <TabPanel value={value} index={0}>
                Posts
              </TabPanel>
              <TabPanel value={value} index={1}>
                Followers
              </TabPanel>
              <TabPanel value={value} index={2}>
                Following
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default UserInfo;
