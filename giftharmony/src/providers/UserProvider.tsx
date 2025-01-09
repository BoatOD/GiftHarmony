import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { IProfile } from "../interface/IProfile";
import { UserContext } from "../utils/UserContext";
import axios from "axios";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const base_url = import.meta.env.VITE_API_URL;

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

  const onSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      console.log("Login successful");
      console.log(response.getAuthResponse().id_token);
      const token: string = response.getAuthResponse().id_token;
      const res = await axios.post(
        base_url + "/auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", res.data.accessToken);
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
