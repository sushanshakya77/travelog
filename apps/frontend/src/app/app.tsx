import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './Routes/PrivateRoute';
import { useAuthentication } from './useAuthentication/useAuthentication';
import 'swiper/css/bundle';
import './Components/styles.css';
import BaseLayout from './Pages/BaseLayout';
import UserInfo from './Pages/UserInfo';
import Destination from './Pages/Destination';
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
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    );
}

export default App;
