// Auth0ProviderWrapper.js

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWrapper = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-lrv41ofru2h8gyvc.us.auth0.com"
      clientId="I9wCY2VkFTGFCeb1O7yp8mewA5wbW6sE"
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
