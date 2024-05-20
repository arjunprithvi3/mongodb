// AdminLogin.js

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h3>MediCare</h3>
              <h4>Welcome Back!</h4>
            </div>
          </div>
          <div>
            <div>
              <div></div>
              <div>
                <button
                  onClick={() => loginWithRedirect()}
                >
                  Login with Auth0
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
