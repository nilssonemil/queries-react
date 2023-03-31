import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useToken } from "./hooks/usetoken";

const NavigationBar = () => {
  const { username, isAuthenticated } = useToken();

  const action = isAuthenticated ? (
    <Typography>{username}</Typography>
  ) : (
    <Link to="login">Login</Link>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/">Queries</Link>
          </Typography>
          {action}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavigationBar;
