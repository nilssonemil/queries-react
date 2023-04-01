import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useToken } from "./hooks/usetoken";
import "./loginform.css";

const LoginForm = () => {
  const { token, setCredentials } = useToken();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    authenticate();
  };

  const authenticate = async () => {
    setError(null);
    setHasSubmitted(true);
    setIsLoaded(false);
    const response = await fetch("http://localhost:8080/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa(username + ":" + password),
      },
    });

    if (response.status === 401) {
      setError(Error("Not authenticated."));
    } else if (response.status === 200) {
      setCredentials(username, (await response.json()).token);
    }
    setIsLoaded(true);
  };

  const isWaiting = hasSubmitted && !isLoaded;
  const showError = hasSubmitted && isLoaded && error;

  const form = (
    <FormControl>
      <TextField
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="dense"
      />
      <TextField
        label="password"
        type="password"
        value={password}
        margin="dense"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box textAlign="center">
        <Button
          color="primary"
          variant="contained"
          onClick={onSubmit}
          sx={{ width: 200, padding: 1, margin: 3 }}
          size="large"
        >
          Sign in
        </Button>
      </Box>
    </FormControl>
  );

  const isAuthenticated = isLoaded && hasSubmitted && !error;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box display="flex" flexDirection="column" padding={1} m={2} pt={3}>
          {form}

          {showError && <div>{error.message}</div>}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
