export type Question = {
  key: string;
  author: string;
  summary: string;
  description: string;
  answers: Answer[];
};

export type Answer = {
  key: string;
  question: string;
  author: string;
  text: string;
  answeredAt: string;
}

export default Question;
