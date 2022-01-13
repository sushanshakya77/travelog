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
  Container,
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
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(20px);
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
  console.log(token);
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

            <Tooltip title="Notifications">
              <NavButton color="inherit">
                <CircleNotifications />
              </NavButton>
            </Tooltip>

            <Tooltip title="Account">
              <Link to="/user/info">
                <NavButton color="inherit">
                  <AccountCircle />
                </NavButton>
              </Link>
            </Tooltip>

            <Tooltip title="Logout">
              <NavButton color="inherit" onClick={handleLogout}>
                <ExitToApp />
              </NavButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </div>
  );
}

export default Navbar;
