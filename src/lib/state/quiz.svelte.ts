import { fetchQuestions } from "$lib/services/quiz.service";
import type { QuizQuestion } from "$lib/types/quiz";

class QuizState {
    allQuestions = $state<QuizQuestion[]>([])
    errorMessgae = $state<string | null>(null);
    loading = $state(false);
    currentIndex = $state(0)
    answers = $state<Map<number, string | string[]>>(new Map());

    async loadQuestions() {
        this.loading = true;
        try {
            this.allQuestions = await fetchQuestions()
        } catch (e) {
            this.errorMessgae = e instanceof Error ? e.message : 'Something went wrong'
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

    resetQuiz() {
        this.allQuestions = [];
        this.answers = new Map();
        this.currentIndex = 0;
        this.errorMessgae = null;
    }
}

export const quiz = new QuizState()