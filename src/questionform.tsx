import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuestions } from "./hooks/usequestions";
import { useToken } from "./hooks/usetoken";

const QuestionForm = () => {
  const { isAuthenticated, token, user } = useToken();
  const { addQuestion } = useQuestions();
  const [summary, setSummary] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postQuestion();
  };

  const postQuestion = async () => {
    setHasSubmitted(true);
    setIsLoaded(false);
    const response = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        summary: summary,
        description: description,
      }),
    });
    console.debug(response);
    if (response.status === 401) {
      setError(Error("Not authenticated."));
    } else if (response.status === 201) {
      const question = await response.json();
      addQuestion(question);
      setSummary("");
      setDescription("");
    }
    setIsLoaded(true);
  };

  const form = (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }} textAlign="center">
      <TextField
        required
        margin="normal"
        fullWidth
        label="Summary"
        type="text"
        name="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <TextField
        required
        margin="normal"
        fullWidth
        label="Description"
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
      />
      {error && <Alert severity="error">{error.message}</Alert>}
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{ width: 200, mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );

  const info = (
    <Alert
      severity="info"
      sx={{ mt: 1 }}
      action={
        <Button color="inherit" href="/login" size="small">
          Sign In
        </Button>
      }
    >
      You must be signed in to post questions.
    </Alert>
  );

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          marginTop: 5,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome{user !== undefined ? " " + user.id : ""}, post a question:
        </Typography>
        {isAuthenticated ? form : info}
      </Box>
    </Paper>
  );
};

export default QuestionForm;
