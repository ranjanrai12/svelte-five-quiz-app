export interface QuizQuestion {
  id: number;
  type: 'radio' | 'multiple' | 'textbox' | 'textarea';
  question: string;
  options: string[];
  correctAnswer: string | string[];
  hint: string;
}