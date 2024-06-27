import { useAuth0 } from "@auth0/auth0-react";

export const useRegister = () => {
  const { loginWithRedirect } = useAuth0();

  const registerUser = () => {
    loginWithRedirect({
      screen_hint: "signup",
    });
  };

  return registerUser;
};
