import type { QuizQuestion } from '$lib/types/quiz';
import questionsData from '$lib/data/quiz-questions-response.json';

export async function fetchQuestions(): Promise<QuizQuestion[]> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return questionsData as QuizQuestion[];
	} catch {
		throw new Error("Failed to load data")
	}
}
