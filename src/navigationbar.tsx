import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useToken } from "./hooks/usetoken";

const NavigationBar = () => {
  const { isAuthenticated } = useToken();
  //<Link to={"/login"}>Login</Link>

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Queries
        </Typography>
        <a href="/login">Login</a>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
