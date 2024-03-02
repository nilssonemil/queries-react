import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useToken } from "./hooks/usetoken";
import AuthorAvatar from "./components/authoravatar";

const NavigationBar = () => {
  const { user } = useToken();

  const action = user === undefined ? (
    <Button href="/login">Login</Button>
  ) : (
    <Stack direction="row" alignItems="center">
      <Typography sx={{ mr: 1 }}>{user.id}</Typography>
      <AuthorAvatar author={user} small />
    </Stack>
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
