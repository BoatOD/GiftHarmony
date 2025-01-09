import { createContext } from "react";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { IProfile } from "../interface/IProfile";

export interface UserContextType {
    profile: IProfile | null;
    onSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
    onFailure: (res: unknown) => void;
    logOut: () => void;
    clientId: string;
  }
  
export const UserContext = createContext<UserContextType>({
  profile: null,
  onSuccess: () => {},
  onFailure: () => {},
  logOut: () => {},
  clientId: "",
});
