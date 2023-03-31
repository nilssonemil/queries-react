import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import LoginForm from "./loginform";
import QuestionForm from "./questionform";
import QuestionList from "./questionlist";

export const TokenContext = createContext({
  token: "",
  setToken: (() => "") as Dispatch<SetStateAction<string>>,
});

export type Question = {
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

export default App;
