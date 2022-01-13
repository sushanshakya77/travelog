import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Home from './Home';

const BaseLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
