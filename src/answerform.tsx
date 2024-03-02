import { Paper, Alert, Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { useToken } from "./hooks/usetoken";
import Question from "./types";

type AnswerFormProps = { question: Question; };

const AnswerForm: React.FunctionComponent<AnswerFormProps> = ({ question }) => {
  const { isAuthenticated, token } = useToken();
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postAnswer();
  }

  const postAnswer = async () => {
    setHasSubmitted(true);
    setIsLoaded(false);

    const response = await fetch(`http://localhost:8080/answers?question=${question.key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        text: text
      }),
    });

    console.debug(response);

    if (response.status === 401) {
      setError(Error("Not authenticated."));
    } else if (response.status === 201) {
      const answer = response.json();
      console.log(answer);
      // TODO: Save answer somewhere
      setText("")
    }
    setIsLoaded(true);
  }

  const form = <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }} textAlign="center">
    {error && <Alert severity="error">{error.message}</Alert>}
    <TextField
      required
      margin="normal"
      fullWidth
      label="Answer"
      type="text"
      name="answer"
      value={text}
      onChange={(e) => setText(e.target.value)}
      multiline
      minRows={10}
      maxRows={Infinity}
    />
    <Button
      type="submit"
      variant="contained"
      size="medium"
      sx={{ width: 200, mt: 2 }}
    >
      Submit
    </Button>
  </Box>

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
      You must be signed in to answer questions.
    </Alert>
  );

  return <Paper>
    <Box
      sx={{
        marginTop: 5,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isAuthenticated ? form : info}
    </Box>
  </Paper>
}

export default AnswerForm
