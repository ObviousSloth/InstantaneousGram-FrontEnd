import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export function useAuthToken() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getTokenAndStore = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        localStorage.setItem('token', token);
      }
    };

    getTokenAndStore();
  }, [isAuthenticated, getAccessTokenSilently]);
}
