import {
  Alert,
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useToken } from "./hooks/usetoken";

const LoginForm = () => {
  const { isAuthenticated, setCredentials } = useToken();
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
      setError(Error("Username or password is incorrect."));
    } else if (response.status === 200) {
      setCredentials(username, (await response.json()).token);
    }
    setIsLoaded(true);
  };

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          marginTop: 8,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ mt: 1 }}
          textAlign="center"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            name="password"
          />
          {error && <Alert severity="error">{error.message}</Alert>}
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: 200, mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginForm;
