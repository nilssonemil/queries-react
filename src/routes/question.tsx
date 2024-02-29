import { Box, CardActions, Container, IconButton, Button, Card, CardContent, Typography, } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Answer, Question } from "../types";
import { useLoaderData, useParams } from "react-router-dom";
import NotFound from "./notfound";
import AnswerForm from "../answerform";
import { useEffect, useState } from "react";
import AuthorAvatar from "../components/authoravatar";

const normalize = (str: string) =>
  str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

const QuestionRoute = () => {
  const { key } = useParams();
  const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false);
  const question = useLoaderData() as Question;

  useEffect(() => {
    if (question != null) {
      const location = window.location.pathname;
      const normalizedSummary = normalize(question.summary);
      console.debug("location:", location, "summary:", normalizedSummary)
      if (!location.endsWith(normalizedSummary)) {
        window.history.replaceState(null, question.summary, `${location}/${normalizedSummary}`)
      }
    }
  }, [key])


  if (question == null) return <NotFound />

  return (
    <Container component="main" maxWidth="md">
      <Box justifyContent="center" alignItems="center">
        <QuestionDetail question={question} showAnswerForm={() => setShowAnswerForm(true)} />
        {showAnswerForm && <AnswerForm question={question} />}
        {question.answers.map(a => <AnswerDetail answer={a} />)}
      </Box>
    </Container>
  );

}

type AnswerDetailProps = { answer: Answer }

const AnswerDetail: React.FunctionComponent<AnswerDetailProps> =
  ({ answer }) => {
    return (
      <Card sx={{ mt: 3, p: 1 }}>
        <div style={{ display: 'flex' }}>
          <CardContent>
            <Typography variant="body1">{answer.text}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              answered by {answer.author.id}
            </Typography>
          </CardContent>
          <div style={{ marginLeft: 'auto' }}>
            <AuthorAvatar author={answer.author} />
          </div>
        </div>
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

type QuestionDetailProps = { question: Question; showAnswerForm: () => void }

const QuestionDetail: React.FunctionComponent<QuestionDetailProps> =
  ({ question, showAnswerForm }) => {
    return (
      <Card sx={{ mt: 3, p: 1 }}>
        <div style={{ display: 'flex' }}>
          <CardContent>
            <Typography variant="h5">{question.summary}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              asked by {question.author.id}
            </Typography>
            <Typography variant="body1">{question.description}</Typography>
          </CardContent>
          <div style={{ marginLeft: 'auto' }}>
            <AuthorAvatar author={question.author} />
          </div>
        </div>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box>
            <Button size="small" disabled>
              Report
            </Button>
            <Button size="small" onClick={showAnswerForm}>
              Answer
            </Button>
          </Box>
          <IconButton disabled>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card >)
  }

export default QuestionRoute
