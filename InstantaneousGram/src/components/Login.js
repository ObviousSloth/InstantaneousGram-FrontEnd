

import { useAuth0 } from "@auth0/auth0-react";


export const useLogIn = () => {
  const { loginWithRedirect } = useAuth0();

  const logInUser = () => {
    loginWithRedirect();
  };

  return logInUser;
};