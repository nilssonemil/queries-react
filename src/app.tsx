import {
  createContext,
  Dispatch,
  Fragment,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import NavigationBar from "./navigationbar";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "@mui/icons-material";
import Root from "./routes/root";

/*
function App() {
  return (
    <Fragment>
      <CssBaseline>
        <TokenProvider>
          <QuestionProvider>
            <NavigationBar />
            <RouterProvider router={router} />
          </QuestionProvider>
        </TokenProvider>
      </CssBaseline>
    </Fragment>
  );
}*/

//export default App;
