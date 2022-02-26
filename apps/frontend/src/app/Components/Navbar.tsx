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
import { Link, useNavigate } from 'react-router-dom';
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
  const { token, setAuthState } = useAuthentication();

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
            <Tooltip title="Explore">
              <Link to="/explore">
                <IconButton color="inherit">
                  <Feed />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Trips">
              <Link to="/trips">
                <IconButton color="inherit">
                  <Book />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <CircleNotifications />
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton
                color="inherit"
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
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
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                </Link>
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
