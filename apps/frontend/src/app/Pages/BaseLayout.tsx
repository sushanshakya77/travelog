import { Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Home from './Home';

const BaseLayout = () => {
  return (
    <div>
      <Navbar />
      <Toolbar sx={{ mt: 1 }} />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
