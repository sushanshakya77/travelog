import styled from '@emotion/styled';
import {
  AccountCircle,
  Book,
  CircleNotifications,
  ExitToApp,
  Feed,
  Logout,
  PersonAdd,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { IUser, Roles } from '../models/User';
import { useAuthentication } from '../useAuthentication/useAuthentication';

const StyledAppBar = styled(AppBar)`
  background: rgba(255, 255, 255, 0.25);
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(20px);
  /* border-radius: 10px; */
  border-bottom: 1px solid rgba(153, 149, 149, 0.18);
`;
const NavButton = styled(Button)`
  color: black;
  font-family: 'Poppins', sans-serif;
  font-size: 25px;
  text-decoration: none;
  border-radius: '25px';
`;

function Navbar() {
  const { token, setAuthState, user } = useAuthentication();

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post(
        '/api/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setAuthState('loggedOut');
        // window.location.reload();
        navigate('/login');
      });
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: userInfoData } = useQuery<IUser>('userInfo', () =>
    axios.get('api/userInfo').then((res) => res.data)
  );
  const [anchorElNoti, setAnchorElNoti] = React.useState<null | HTMLElement>(
    null
  );
  const openNoti = Boolean(anchorElNoti);
  const handleClickNoti = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };

  return (
    <div>
      <StyledAppBar elevation={0} color="transparent">
        <Container maxWidth="lg">
          <Toolbar>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>
                travelog.
              </Typography>
            </Link>

            <div style={{ flexGrow: 1 }} />
            <Link to="/blogs">
              <Button
                color="inherit"
                sx={{ borderRadius: '14px' }}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-book"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                    <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                    <line x1="3" y1="6" x2="3" y2="19" />
                    <line x1="12" y1="6" x2="12" y2="19" />
                    <line x1="21" y1="6" x2="21" y2="19" />
                  </svg>
                }
              >
                Blogs
              </Button>
            </Link>
            <Link to="/explore">
              <Button
                color="inherit"
                sx={{ borderRadius: '14px' }}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-license"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                    <line x1="9" y1="7" x2="13" y2="7" />
                    <line x1="9" y1="11" x2="13" y2="11" />
                  </svg>
                }
              >
                Explore
              </Button>
            </Link>
            <Link to={`/trips/${userInfoData?._id}`}>
              <Button
                color="inherit"
                sx={{ borderRadius: '14px' }}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-car"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                    <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                  </svg>
                }
              >
                {' '}
                Trips
              </Button>
            </Link>
            <Button
              color="inherit"
              sx={{ borderRadius: '14px' }}
              onClick={handleClickNoti}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bell-ringing"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                  <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
                  <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
                </svg>
              }
            >
              Alerts
            </Button>
            <Menu
              anchorEl={anchorElNoti}
              id="account-menu"
              open={openNoti}
              onClose={handleCloseNoti}
              onClick={handleCloseNoti}
              sx={{ maxWidth: '350px' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {(userInfoData?.dob as unknown as number) === Date.now() && (
                <MenuItem>
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-confetti"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#009988"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 5h2" />
                      <path d="M5 4v2" />
                      <path d="M11.5 4l-.5 2" />
                      <path d="M18 5h2" />
                      <path d="M19 4v2" />
                      <path d="M15 9l-1 1" />
                      <path d="M18 13l2 -.5" />
                      <path d="M18 19h2" />
                      <path d="M19 18v2" />
                      <path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1.003 1.003 0 0 0 1.329 1.329l9.579 -4.39z" />
                    </svg>
                  </ListItemIcon>
                  🎉Happy Birthday! {userInfoData?.firstName},<br />
                  We wish you a happy birthday! <br />
                  🎉
                </MenuItem>
              )}
              <MenuItem>
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-trending-up"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#009988"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="3 17 9 11 13 15 21 7" />
                    <polyline points="14 7 21 7 21 14" />
                  </svg>
                </ListItemIcon>
                Trending Destination of the day
                <br /> - Boudha
              </MenuItem>
            </Menu>
            <Tooltip title="Account">
              <IconButton
                color="inherit"
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={`http://localhost:3333/${userInfoData?.profilePicture}`}
                ></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <List>
                <Link
                  to="user/info"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Avatar
                        src={`http://localhost:3333/${user.profilePicture}`}
                      />
                    </ListItemIcon>
                    <ListItemText primary={user?.username} />
                  </ListItem>
                </Link>
                {user?.role === Roles.ADMIN && (
                  <Link
                    to="admin"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dashboard"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="12" cy="13" r="2" />
                          <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                          <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                        </svg>
                      </ListItemIcon>
                      <ListItemText primary="Admin Dashboard" />
                    </ListItem>
                  </Link>
                )}

                <Divider />
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Menu>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </div>
  );
}

export default Navbar;
