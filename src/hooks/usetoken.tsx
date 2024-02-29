import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const TokenContext = createContext({
  isAuthenticated: false,
  token: "",
  username: "",
  setCredentials: (username: string, token: string) => { },
});

export const TokenProvider: FunctionComponent<any> = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(""); // TODO: Should be read by calling the server
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
        setIsAuthenticated(true);
        const username = decodeJwt(token).sub;
        setUsername(username);
      }
    }
  }

  const storeTokenInCookies = (token: string) => {
    const expstr = decodeJwt(token).exp;
    const expirationDate = new Date(expstr);
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `jwtToken=${token}; expirations=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`
  }

  useEffect(() => readTokenFromCookies, []);

  const setCredentials = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    setIsAuthenticated(token != "");
    storeTokenInCookies(token);
  };

  return (
    <TokenContext.Provider
      value={{ isAuthenticated, token, username, setCredentials }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
