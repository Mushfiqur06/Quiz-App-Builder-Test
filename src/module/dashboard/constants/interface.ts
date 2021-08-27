export interface Imovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
interface IQuizesDetails {
  id: number;
  question: string;
  answer: any[];
  rightAnswer: string;
}

export interface IQuizes {
  id: number;
    name: string;
    category: string;
    author: string;
    quizes: IQuizesDetails;
}