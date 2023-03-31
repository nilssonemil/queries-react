import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";

const TokenContext = createContext({
  isAuthenticated: false,
  token: "",
  username: "",
  setCredentials: (username: string, token: string) => {},
});

export const TokenProvider: FunctionComponent<any> = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setCredentials = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    setIsAuthenticated(token != "");
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
