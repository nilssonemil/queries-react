import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Root from "./routes/root";
import Login from "./routes/login";
import NavigationBar from "./navigationbar";
import { CssBaseline } from "@mui/material";
import { TokenProvider } from "./hooks/usetoken";
import { QuestionProvider } from "./hooks/usequestions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

root.render(
  <React.StrictMode>
    <TokenProvider>
      <QuestionProvider>
        <CssBaseline>
          <NavigationBar />
          <RouterProvider router={router} />
        </CssBaseline>
      </QuestionProvider>
    </TokenProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
