import { useContext, useState } from "react";
import { useToken } from "./hooks/usetoken";

const LoginForm = () => {
  const { token, setCredentials } = useToken();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" disabled={isWaiting} />
    </form>
  );

  const isAuthenticated = isLoaded && hasSubmitted && !error;

  if (isAuthenticated) {
    return <p>You have authenticated and received a token: {token}</p>;
  }

  return (
    <div>
      {form}
      {showError && <div>{error.message}</div>}
    </div>
  );
};

export default LoginForm;
