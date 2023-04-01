import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuestions } from "./hooks/usequestions";
import ShareIcon from "@mui/icons-material/Share";

const QuestionList = () => {
  const { questions, setQuestions } = useQuestions();
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.debug("render question list");

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:8080/questions")
      .then((res) => res.json())
      .then(
        (questions) => {
          setIsLoaded(true);
          setQuestions(questions);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [setQuestions]);

  if (error) {
    console.log("render error");
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    console.log("render loading");
    return <div>Loading...</div>;
  } else {
    console.log("render items");
    const listItems = questions.map((q) => (
      <Card sx={{ mt: 3, p: 1 }}>
        <CardContent>
          <Typography variant="h5">{q.summary}</Typography>
          <Typography variant="body1">{q.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button size="small" disabled>
              Report
            </Button>
            <Button size="small" disabled>
              Answer
            </Button>
          </Box>
          <IconButton disabled>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    ));
    return <Box component="ul">{listItems}</Box>;
  }
};

export default QuestionList;
