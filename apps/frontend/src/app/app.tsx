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
        sx={{ marginTop: '200px', marginLeft: '200px' }}
      />
    );
  else
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="lg">
              <PrivateRoute>
                <BaseLayout />
              </PrivateRoute>
            </Container>
          }
        >
          <Route index element={<Home />} />
          <Route path="user/info" element={<UserInfo />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    );
}

export default App;
