import React, {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import LoginForm from "./loginform";

export const TokenContext = createContext({
  token: "",
  setToken: (() => "") as Dispatch<SetStateAction<string>>,
});

type Question = {
  key: string;
  summary: string;
  description: string;
  questioner: string;
};

export const QuestionContext = createContext({
  questions: [] as Question[],
  addQuestion: (question: Question) => {},
  setQuestions: (() => []) as Dispatch<SetStateAction<Question[]>>,
});

export const QuestionProvider: FunctionComponent<any> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (question: Question) => {
    const index = questions.findIndex((q) => q.key == question.key);
    if (index === -1) setQuestions([...questions, question]);
  };

  return (
    <QuestionContext.Provider value={{ questions, addQuestion, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const TokenProvider: FunctionComponent<any> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
export const useQuestions = () => useContext(QuestionContext);

function App() {
  return (
    <TokenProvider>
      <QuestionProvider>
        <LoginForm />
        <QuestionList />
        <QuestionForm />
      </QuestionProvider>
    </TokenProvider>
  );
}

function QuestionForm() {
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
}

function QuestionList() {
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
}

export default App;
