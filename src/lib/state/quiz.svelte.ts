import { fetchQuestions } from "$lib/services/quiz.service";
import type { QuizQuestion } from "$lib/types/quiz";

class QuizState {
    allQuestions = $state<QuizQuestion[]>([])
    errorMessage = $state<string | null>(null);
    loading = $state(false);
    currentIndex = $state(0)
    answers = $state<Map<number, string | string[]>>(new Map());
    timeElapsed = $state(0);

    private quizIntervalId: null | number = null;

    async loadQuestions() {
        this.loading = true;
        try {
            this.allQuestions = await fetchQuestions();
            this.startTimer();
        } catch (e) {
            this.errorMessage = e instanceof Error ? e.message : 'Something went wrong'
        } finally {
            this.loading = false
        }
    }

    setAnswer(id: number, value: string | string[]) {
        this.answers = new Map(this.answers).set(id, value)
    }

    deleteAnswer(id: number) {
        if (!this.answers.has(id)) return;

        const updated = new Map(this.answers)
        updated.delete(id)
        this.answers = updated
    }

    getAnswer(id: number): string | string[] | undefined {
        return this.answers.get(id);
    }

    prevQuestion() {
        this.currentIndex--;
    }

    nextQuestion() {
        this.currentIndex++;
    }

    submitQuiz() {
        this.stopTimer();
    }

    resetQuiz() {
        this.stopTimer();
        this.allQuestions = [];
        this.answers = new Map();
        this.currentIndex = 0;
        this.timeElapsed = 0;
        this.errorMessage = null;
    }

    private startTimer() {
        this.quizIntervalId = setInterval(() => {
            this.timeElapsed++;
        }, 1000)
    }

    private stopTimer() {
        if (this.quizIntervalId !== null) {
            clearInterval(this.quizIntervalId);
            this.quizIntervalId = null;
        }
    }
}

export const quiz = new QuizState()