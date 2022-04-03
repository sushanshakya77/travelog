import { Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import { useRecoilState } from 'recoil';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Home from './Home';

const BaseLayout = () => {
  return (
    <div>
      <Navbar />
      <Toolbar sx={{ mt: 1 }} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BaseLayout;
