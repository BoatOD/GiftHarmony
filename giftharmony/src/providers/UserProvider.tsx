import { gapi } from "gapi-script";
import React, { useEffect, useState, createContext } from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { IProfile } from "../interface/IProfile";
import axios from "axios";

export interface UserContextType {
  profile: IProfile | null;
  onSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure: (res: unknown) => void;
  logOut: () => void;
  clientId: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType>({
  profile: null,
  onSuccess: () => {},
  onFailure: () => {},
  logOut: () => {},
  clientId: "",
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
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
      const token: string = response.getAuthResponse().id_token;
      const res = await axios.post(
        base_url + "/auth",
        {},
        {
          withCredentials: true,
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
