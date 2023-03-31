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
  setToken: (() => "") as Dispatch<SetStateAction<string>>,
});

export const TokenProvider: FunctionComponent<any> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  const isAuthenticated = token == "";

  return (
    <TokenContext.Provider value={{ isAuthenticated, token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
