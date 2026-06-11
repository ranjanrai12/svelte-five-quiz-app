import type { QuizQuestion } from '$lib/types/quiz';
import questionsData from '$lib/data/quiz-questions-response.json';

export async function getQuestions(): Promise<QuizQuestion[]> {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return questionsData as QuizQuestion[];
}
