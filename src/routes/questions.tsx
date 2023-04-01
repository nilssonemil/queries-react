import { Box, Container } from "@mui/material";
import QuestionForm from "../questionform";
import QuestionList from "../questionlist";

const Questions = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box justifyContent="center" alignItems="center">
        <QuestionForm />
        <QuestionList />
      </Box>
    </Container>
  );
};

export default Questions;
