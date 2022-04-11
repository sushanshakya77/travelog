import { CircularProgress } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import 'swiper/css/bundle';
import AdminDestination from './admin/Pages/AdminDestination';
import AdminHome from './admin/Pages/AdminHome';
import AdminSubDestination from './admin/Pages/AdminSubDestination';
import './Components/styles.css';
import AddBlog from './Pages/AddBlog';
import BaseLayout from './Pages/BaseLayout';
import Blogs from './Pages/Blogs';
import Destination from './Pages/Destination';
import Explore from './Pages/Explore';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SingleBlog from './Pages/SingleBlog';
import SingleTrip from './Pages/SingleTrip';
import Trips from './Pages/Trips';
import UserInfo from './Pages/UserInfo';
import PrivateRoute from './Routes/PrivateRoute';
import { useAuthentication } from './useAuthentication/useAuthentication';

export function App() {
  //recoil fetch
  const { authState, fetchAuthState } = useAuthentication();

  //check for refreshtoken
  useEffect(() => {
    fetchAuthState();
  }, [fetchAuthState]);
  // console.log(authState);

  if (authState === 'uncertain')
    return (
      <CircularProgress
        color="secondary"
        sx={{ marginLeft: '700px', marginTop: '350px' }}
      />
    );
  else
    return (
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <BaseLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="user/info" element={<UserInfo />} />
          <Route path="destinations/:id" element={<Destination />} />
          <Route path="explore" element={<Explore />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="singleBlog/:id" element={<SingleBlog />} />
          <Route path="blogs/addBlog" element={<AddBlog />} />
          <Route path="trips/:id" element={<Trips />} />
          <Route path="trip/:id" element={<SingleTrip />} />
          <Route path="admin" element={<AdminHome />}>
            <Route path="destination" element={<AdminDestination />} />
            <Route path="subdestination" element={<AdminSubDestination />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    );
}

export default App;
