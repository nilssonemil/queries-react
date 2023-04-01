import { Container } from "@mui/material";
import QuestionForm from "../questionform";
import QuestionList from "../questionlist";

const Questions = () => {
  return (
    <Container component="main" maxWidth="sm">
      <QuestionForm />
      <QuestionList />
    </Container>
  );
};

export default Questions;
