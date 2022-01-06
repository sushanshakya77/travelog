import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
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
        sx={{ marginTop: '200px', marginRight: '200px' }}
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
                <Dashboard />
              </PrivateRoute>
            </Container>
          }
        ></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    );
}

export default App;
