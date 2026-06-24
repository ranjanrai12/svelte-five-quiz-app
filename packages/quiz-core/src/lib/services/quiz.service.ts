import type { QuizQuestion } from '$lib/types';
import questionsData from '$lib/data/quiz-questions-response.json';

export async function fetchQuestions(): Promise<QuizQuestion[]> {
	const data = await new Promise<QuizQuestion[]>((resolve) =>
		setTimeout(() => resolve(questionsData as QuizQuestion[]), 500)
	);
	return data;
}
