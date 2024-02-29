import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Question from "../types";

export type QuestionContext = {
  questions: Question[];
  addQuestion: (question: Question) => void;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
};

const InternalQuestionContext = createContext<QuestionContext>({
  questions: [] as Question[],
  addQuestion: (_question: Question) => { },
  setQuestions: (() => []) as Dispatch<SetStateAction<Question[]>>,
});

export const QuestionProvider: FunctionComponent<any> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (question: Question) => {
    const index = questions.findIndex((q) => q.key == question.key);
    if (index === -1) setQuestions([...questions, question]);
  };

  return (
    <InternalQuestionContext.Provider value={{ questions, addQuestion, setQuestions }}>
      {children}
    </InternalQuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(InternalQuestionContext);
