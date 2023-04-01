import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import Login from "./routes/login";
import NavigationBar from "./navigationbar";
import { createTheme, CssBaseline } from "@mui/material";
import { TokenProvider, useToken } from "./hooks/usetoken";
import { QuestionProvider } from "./hooks/usequestions";
import Questions from "./routes/questions";
import NotFound from "./routes/notfound";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#eb4034",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Questions />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <TokenProvider>
        <QuestionProvider>
          <CssBaseline>
            <RouterProvider router={router} />
          </CssBaseline>
        </QuestionProvider>
      </TokenProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
