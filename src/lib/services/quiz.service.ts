import type { QuizQuestion } from '$lib/types/quiz';
import questionsData from '$lib/data/quiz-questions-response.json';

export async function fetchQuestions(): Promise<QuizQuestion[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return questionsData as QuizQuestion[];
}
