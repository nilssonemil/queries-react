import { Box, CardActions, Container, IconButton, Button, Card, CardContent, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Answer, Question } from "../types";
import { useParams } from "react-router-dom";
import { useQuestions } from "../hooks/usequestions";
import NotFound from "./notfound";
import AnswerForm from "../answerform";

const QuestionRoute = () => {
  const { key } = useParams();
  const { questions } = useQuestions();
  console.log("key:", key);
  console.log("questions:", questions);
  const question = questions.find(q => q.key == key);

  if (question == null) return <NotFound />

  return (
    <Container component="main" maxWidth="md">
      <Box justifyContent="center" alignItems="center">
        <QuestionDetail question={question} />
        <AnswerForm question={question} />
        {question.answers.map(a => <AnswerDetail answer={a} />)}
      </Box>
    </Container>
  );

}

type AnswerDetailProps = { answer: Answer }

const AnswerDetail: React.FunctionComponent<AnswerDetailProps> =
  ({ answer }) => {
    console.log(answer)
    return (
      <Card sx={{ mt: 3, p: 1 }}>
        <CardContent>
          <Typography variant="body1">{answer.text}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            answered by {answer.author}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button size="small" disabled>
              Report
            </Button>
          </Box>
          <IconButton disabled>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>)

  }

type QuestionDetailProps = { question: Question; }

const QuestionDetail: React.FunctionComponent<QuestionDetailProps> =
  ({ question }) => {
    return (
      <Card sx={{ mt: 3, p: 1 }}>
        <CardContent>
          <Typography variant="h5">{question.summary}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            asked by {question.author}
          </Typography>
          <Typography variant="body1">{question.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button size="small" disabled>
              Report
            </Button>
            <Button size="small">
              Answer
            </Button>
          </Box>
          <IconButton disabled>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>)
  }

export default QuestionRoute
