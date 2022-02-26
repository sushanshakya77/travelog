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

export const useAuthentication = () => {
  const [authState, setAuthState] = useRecoilState(authStatus);
  const [token, setToken] = useRecoilState(tokenStatus);

  const fetchAuthState = useCallback(() => {
    axios
      .get('/api/auth/refreshtoken')
      .then((response) => {
        console.log('this is response');
        console.log(response);
        setToken(response.data.accessToken);
        setAuthState('loggedIn');
      })
      .catch(() => setAuthState('loggedOut'));
  }, [setAuthState, setToken]);
  return { token, authState, setAuthState, fetchAuthState };
};
