import React, { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <LoginForm />
      <QuestionList />
      <QuestionForm />
    </div>
  );
}

type Question = {
  key: string;
  summary: string;
  description: string;
  questioner: string;
};

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState<String>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    authenticate();
  };

  const authenticate = async () => {
    setIsLoaded(false);
    setError(null);
    setHasSubmitted(true);
    const response = await fetch("http://localhost:8080/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    if (response.status === 401) {
      setError(Error("Not authenticated."));
    } else if (response.status === 200) {
      setToken((await response.json()).token);
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
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" disabled={isWaiting} />
    </form>
  );

  const isAuthenticated = isLoaded && hasSubmitted && !error;

  console.log(
    "isAuthenticated",
    isAuthenticated,
    "isLoaded",
    isLoaded,
    "error",
    error,
    "hasSubmitted",
    hasSubmitted
  );
  if (isAuthenticated) {
    return <p>You have authenticated and received a token: {token}</p>;
  }

  return (
    <div>
      {form}
      {showError && <div>{error.message}</div>}
    </div>
  );
};

function QuestionForm() {
  const [summary, setSummary] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postQuestion();
  };

  const postQuestion = async () => {
    setHasSubmitted(true);
    setIsLoaded(false);
    const response = await fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: summary,
        desccription: description,
      }),
    });

    if (response.status === 401) {
      setError(Error("Not authenticated."));
    } else if (response.status === 201) {
      setQuestion(await response.json());
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
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

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
