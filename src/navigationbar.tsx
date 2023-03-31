import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useToken } from "./app";

const NavigationBar = () => {
  const { isAuthenticated } = useToken();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Queries
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
