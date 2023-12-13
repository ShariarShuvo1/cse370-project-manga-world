import { createContext } from "react";

export const Auth = createContext({
  authorised: "false",
  setAuthorised: (value: string) => {},
  userId: "",
  setUserId: (value: string) => {},
  userType: "",
  setUserType: (value: string) => {},
});
