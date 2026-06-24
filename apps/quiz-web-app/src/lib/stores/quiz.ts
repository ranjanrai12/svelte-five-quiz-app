import { writable, derived, get } from 'svelte/store';
import {
	fetchQuestions,
	buildResults,
	calculateScore,
	calculatePercentage,
	type QuizQuestion
} from 'quiz-core';

type AnswerMap = Map<number, string | string[]>;

class QuizStore {
	// Core state
	readonly allQuestions = writable<QuizQuestion[]>([]);
	readonly errorMessage = writable<string | null>(null);
	readonly loading = writable(false);
	readonly currentIndex = writable(0);
	readonly answers = writable<AnswerMap>(new Map());
	readonly timeElapsed = writable(0);

	// Derived state
	readonly currentQuestion = derived(
		[this.allQuestions, this.currentIndex],
		([$allQuestions, $currentIndex]) => $allQuestions[$currentIndex]
	);
	readonly totalQuestions = derived(this.allQuestions, ($allQuestions) => $allQuestions.length);
	readonly answeredCount = derived(this.answers, ($answers) => $answers.size);
	readonly allAnswered = derived(
		[this.totalQuestions, this.answeredCount],
		([$totalQuestions, $answeredCount]) => $totalQuestions > 0 && $totalQuestions === $answeredCount
	);
	readonly isFirstQuestion = derived(this.currentIndex, ($currentIndex) => $currentIndex === 0);
	readonly isLastQuestion = derived(
		[this.currentIndex, this.totalQuestions],
		([$currentIndex, $totalQuestions]) => $currentIndex === $totalQuestions - 1
	);
	readonly results = derived([this.allQuestions, this.answers], ([$allQuestions, $answers]) =>
		buildResults($allQuestions, $answers)
	);
	readonly score = derived(this.results, ($results) => calculateScore($results));
	readonly percentage = derived(
		[this.score, this.totalQuestions],
		([$score, $totalQuestions]) => calculatePercentage($score, $totalQuestions)
	);

	private quizIntervalId: ReturnType<typeof setInterval> | null = null;

	async loadQuestions() {
		this.loading.set(true);
		this.errorMessage.set(null);
		try {
			this.allQuestions.set(await fetchQuestions());
			this.startTimer();
		} catch (e) {
			this.errorMessage.set(e instanceof Error ? e.message : 'Something went wrong');
		} finally {
			this.loading.set(false);
		}
	}

	setAnswer(id: number, value: string | string[]) {
		this.answers.update((map) => new Map(map).set(id, value));
	}

	deleteAnswer(id: number) {
		this.answers.update((map) => {
			if (!map.has(id)) return map;
			const next = new Map(map);
			next.delete(id);
			return next;
		});
	}

	getAnswer(id: number): string | string[] | undefined {
		return get(this.answers).get(id);
	}

	prevQuestion() {
		this.currentIndex.update((i) => i - 1);
	}

	nextQuestion() {
		this.currentIndex.update((i) => i + 1);
	}

	submitQuiz() {
		this.stopTimer();
	}

	resetQuiz() {
		this.stopTimer();
		this.allQuestions.set([]);
		this.answers.set(new Map());
		this.currentIndex.set(0);
		this.timeElapsed.set(0);
		this.errorMessage.set(null);
	}

	private startTimer() {
		this.stopTimer();
		this.quizIntervalId = setInterval(() => this.timeElapsed.update((t) => t + 1), 1000);
	}

	private stopTimer() {
		if (this.quizIntervalId !== null) {
			clearInterval(this.quizIntervalId);
			this.quizIntervalId = null;
		}
	}
}

export const quiz = new QuizStore();
