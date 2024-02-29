import { Box, CardActions, Container, IconButton, Button, Card, CardContent, Typography, Avatar, CardHeader } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Answer, Question } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useQuestions } from "../hooks/usequestions";
import NotFound from "./notfound";
import AnswerForm from "../answerform";
import { useEffect, useState } from "react";
import AuthorAvatar from "../components/authoravatar";

const normalize = (str: string) =>
  str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

const QuestionRoute = () => {
  const { key } = useParams();
  const { questions } = useQuestions();
  const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const question = questions.find(q => q.key == key);

  useEffect(() => {
    if (question != null) navigate(`${normalize(question.summary)}`)
  }, [key])

  // TODO: If the question is not in state, should render loading and fetch the question
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
    console.log(answer)
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
    console.log(question)
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
