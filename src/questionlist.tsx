import { useEffect, useState } from "react";
import { useQuestions } from "./app";

const QuestionList = () => {
  const { questions, setQuestions } = useQuestions();
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.debug("render question list");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
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
  };

  if (error) {
    console.log("render error");
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    console.log("render loading");
    return <div>Loading...</div>;
  } else {
    console.log("render items");
    const listItems = questions.map((q) => <li key={q.key}>{q.summary}</li>);
    return <ul>{listItems}</ul>;
  }
};

export default QuestionList;
