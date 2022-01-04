import { Route, Routes } from 'react-router';
import Login from './Pages/Login';
import Register from './Pages/Register';

export function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
