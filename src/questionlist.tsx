import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuestions } from "./hooks/usequestions";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "./questions/service";

const QuestionList = () => {
  const { questions, setQuestions } = useQuestions();
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  console.debug("render question list");

  useEffect(() => {
    setIsLoaded(false);
    fetchQuestions()
      .then(
        (questions) => {
          console.debug(questions);
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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            asked by {q.author.id}
          </Typography>
          <Typography variant="body1">{q.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button size="small" disabled>
              Report
            </Button>
            <Button size="small" onClick={() => navigate("/questions/" + q.key)}>
              Answer
            </Button>
          </Box>
          <IconButton disabled>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    ));
    console.log(listItems)
    return (
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h5">
          Questions
        </Typography>
        <Box component="ul" sx={{ width: 1, pl: 0 }}>
          {listItems}
        </Box>
      </Box>
    );
  }
};

export default QuestionList;
