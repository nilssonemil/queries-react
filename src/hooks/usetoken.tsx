import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Author } from "../types";

type TokenContext = {
  isAuthenticated: boolean,
  token: string,
  user: Author | undefined,
  setCredentials: (token: string) => void,
}

const InternalTokenContext = createContext<TokenContext>({
  isAuthenticated: false,
  token: "",
  user: undefined,
  setCredentials: (_: string) => { },
});

export const TokenProvider: FunctionComponent<any> = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<Author>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const decodeJwt = (token: string) => {
    const [_header, payload, _signature] = token.split('.');
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  }

  const readTokenFromCookies = () => {
    const cookie = document
      .cookie
      .split("; ")
      .find(row => row.startsWith("jwtToken="))

    if (cookie) {
      const token = cookie.split("=")[1]
      if (token) {
        setToken(token);
        updateUser(token);
        setIsAuthenticated(true);
      }
    }
  }

  const updateUser = async (token: string) => {
    const response = await fetch("http://localhost:8080/users/me", {
      headers: {
        Authorization: "Bearer " + token,
      }
    })

    if (response.status === 200) {
      const json = await response.json()
      setUser(json)
    }
  }

  const storeTokenInCookies = (token: string) => {
    const expstr = decodeJwt(token).exp;
    const expirationDate = new Date(expstr);
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `jwtToken=${token}; expirations=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`
  }

  useEffect(() => readTokenFromCookies, []);

  const setCredentials = (token: string) => {
    setToken(token);
    updateUser(token);
    storeTokenInCookies(token);
  };

  return (
    <InternalTokenContext.Provider
      value={{ isAuthenticated, token, setCredentials, user }}
    >
      {children}
    </InternalTokenContext.Provider>
  );
};

export const useToken = () => useContext(InternalTokenContext);
