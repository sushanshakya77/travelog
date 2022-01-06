import styled from '@emotion/styled';
import {
  AccountCircle,
  CircleNotifications,
  ExitToApp,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../useAuthentication/useAuthentication';

const StyledAppBar = styled(AppBar)`
  background: rgba(222, 242, 241, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  /* background: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18); */
`;
const NavButton = styled(Button)`
  margin-left: 25px;
  color: black;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  &:hover {
    color: green;
  }
`;

function Navbar() {
  const { token, setAuthState } = useAuthentication();
  console.log(token);
  const navigate = useNavigate();
  const handleLogut = () => {
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

  return (
    <div>
      <StyledAppBar
        elevation={0}
        position="static"
        color="transparent"
        style={{ height: '85px' }}
      >
        <Toolbar sx={{ mt: '10px' }}>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton> */}
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>
              travelog.
            </Typography>
          </Link>

          <div style={{ flexGrow: 1 }} />
          <div>
            {/* <Link to="/" style={{ textDecoration: 'none' }}>
              <NavButton variant="text">HOME</NavButton>
            </Link>
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <NavButton variant="text">SHOP</NavButton>
            </Link>
            <NavButton variant="text">SHOP Details</NavButton>
            <NavButton variant="text">BLOG</NavButton> */}
          </div>
          <div style={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <CircleNotifications sx={{ fontSize: '25px' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton color="inherit">
              <AccountCircle sx={{ fontSize: '25px' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton edge="end" color="inherit" onClick={handleLogut}>
              <ExitToApp sx={{ fontSize: '25px' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}

export default Navbar;
