import { useState } from "react";
import { useQuestions } from "./hooks/usequestions";
import { useToken } from "./hooks/usetoken";
import Question from "./types";

const QuestionForm = () => {
  const { token } = useToken();
  const { addQuestion } = useQuestions();
  const [summary, setSummary] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  console.debug("render question form");

  if (token == "") {
    return <p>QuestionFrom disabled. User is not authenticated.</p>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postQuestion();
  };

  const postQuestion = async () => {
    setHasSubmitted(true);
    setIsLoaded(false);
    console.log("current token", token);
    const response = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        summary: summary,
        description: description,
      }),
    });
    console.debug(response);
    if (response.status === 401) {
      setError(Error("Not authenticated."));
    } else if (response.status === 201) {
      const question = await response.json();
      console.log(question);
      setQuestion(question);
      addQuestion(question);
    }
    setIsLoaded(true);
  };

  const isWaiting = hasSubmitted && !isLoaded;
  const showError = hasSubmitted && isLoaded && error;

  const form = (
    <form onSubmit={handleSubmit}>
      <label>
        Summary:
        <input
          type="text"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" disabled={isWaiting} />
    </form>
  );

  return (
    <div>
      {form}
      {showError && <div>{error.message}</div>}
    </div>
  );
};

export default QuestionForm;
