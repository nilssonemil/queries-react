export type Question = {
  key: string;
  author: Author;
  summary: string;
  description: string;
  answers: Answer[];
};

export type Author = {
  id: string;
  avatar: string;
}

export type Answer = {
  key: string;
  question: string;
  author: Author;
  text: string;
  answeredAt: string;
}

export default Question;
