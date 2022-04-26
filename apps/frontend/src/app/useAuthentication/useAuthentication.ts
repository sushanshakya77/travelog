import axios from 'axios';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export const authStatus = atom({
  key: 'authStatus',
  default: 'uncertain',
});

export const tokenStatus = atom({
  key: 'tokenStatus',
  default: '',
});
export const userStatus = atom({
  key: 'user',
  default: Object.create(null),
});

export const useAuthentication = () => {
  const [authState, setAuthState] = useRecoilState(authStatus);
  const [token, setToken] = useRecoilState(tokenStatus);
  const [user, setUser] = useRecoilState(userStatus);

  const fetchAuthState = useCallback(() => {
    axios
      .get('/api/auth/refreshtoken')
      .then((response) => {
        console.log(response.data.accessToken);
        setUser(response.data.user);
        setToken(response.data.accessToken);
        setAuthState('loggedIn');
      })
      .catch(() => setAuthState('loggedOut'));
  }, [setAuthState, setToken, setUser]);
  return { token, authState, setAuthState, fetchAuthState, user };
};
