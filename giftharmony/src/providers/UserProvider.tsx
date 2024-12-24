import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { IProfile } from "../interface/IProfile";
import { UserContext } from "../utils/UserContext";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [profile, setProfile] = useState<IProfile | null>(null);
  const clientId = "810479308587-c60mrh8928o0sedb3dvimijp93i7sis0.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId,
          scope: "", 
        });
      });
    };
    initClient();
  }, [clientId]);

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("profileObj" in response) {
      console.log("Login successful", response);
      setProfile(response.profileObj);
    } else {
      console.log("Offline login response", response);
    }
  };

  const onFailure = (res: unknown) => {
    if (res instanceof Error) {
      console.error("Login failed with error:", res.message);
    } else {
      console.error("Login failed with reason:", res);
    }
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        onSuccess,
        onFailure,
        logOut,
        clientId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
