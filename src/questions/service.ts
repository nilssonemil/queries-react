import { LoaderFunctionArgs } from "react-router-dom";
import { QuestionContext } from "../hooks/usequestions";
import Question from "../types";

const fetchQuestions = async () => {
  return fetch("http://localhost:8080/questions")
    .then((res) => res.json());
}

const fetchQuestion = async (key: string) => {
  return fetchQuestions()
    .then((questions) => questions.find((q: Question) => q.key == key)) || null;
}

const questionLoader = (context: QuestionContext) => {
  return async ({ params }: LoaderFunctionArgs) => {
    const { key } = params as { key: string };
    const { questions } = context;

    if (questions.length > 0) {
      console.debug("looking for question in context...")
      return questions.find((q: Question) => q.key == key) || null;
    }

    console.debug("issuing web request for question...")
    return await fetchQuestion(key);
  };
}

export { fetchQuestions, fetchQuestion, questionLoader, };
