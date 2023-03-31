import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Question from "../types";

const QuestionContext = createContext({
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

export const useQuestions = () => useContext(QuestionContext);
