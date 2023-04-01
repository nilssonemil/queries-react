import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useToken } from "./hooks/usetoken";

const NavigationBar = () => {
  const { username, isAuthenticated } = useToken();

  const action = isAuthenticated ? (
    <Stack direction="row">
      <AccountCircleIcon sx={{ mr: 1 }} />
      <Typography>{username}</Typography>
    </Stack>
  ) : (
    <Button href="/login">Login</Button>
  );

  const logo = (
    <Stack direction="row">
      <Typography component="h1" variant="h5">
        <Button color="inherit" href="/">
          <QuestionAnswerIcon sx={{ mr: 1 }} />
          Queries
        </Button>
      </Typography>
    </Stack>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack />
        {logo}
        {action}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
