import { fetchQuestions } from "$lib/services/quiz.service";
import type { QuizQuestion, QuizResult } from "$lib/types/quiz";

function gradeAnswer(question: QuizQuestion, answer: string | string[]): boolean {
    switch (question.type) {
        case "multiple": {
            const correct = [...(question.correctAnswer as string[])].sort();
            const selected = [...((answer as string[]) ?? [])].sort();
            return (
                correct.length === selected.length &&
                correct.every((item, index) => item === selected[index])
            );
        }
        case "textbox":
            return (
                (answer as string).trim().toLowerCase() ===
                (question.correctAnswer as string).toLowerCase()
            );
        case "textarea":
            return (answer as string).trim().length > 0;
        default:
            return answer === question.correctAnswer;
    }
}

class QuizState {
    allQuestions = $state<QuizQuestion[]>([])
    errorMessage = $state<string | null>(null);
    loading = $state(false);
    currentIndex = $state(0)
    answers = $state<Map<number, string | string[]>>(new Map());
    timeElapsed = $state(0);

    currentQuestion = $derived(this.allQuestions[this.currentIndex]);
    totalQuestions = $derived(this.allQuestions.length);
    answeredCount = $derived(this.answers.size);
    allAnswered = $derived(this.totalQuestions > 0 && this.totalQuestions === this.answeredCount);
    isFirstQuestion = $derived(this.currentIndex === 0);
    isLastQuestion = $derived(this.currentIndex === this.totalQuestions - 1);

    results = $derived<QuizResult[]>(
        this.allQuestions.map((question) => {
            const userAnswer = this.answers.get(question.id) ?? "";
            return {
                question,
                userAnswer,
                correct: gradeAnswer(question, userAnswer),
            };
        })
    );
    score = $derived(this.results.filter((r) => r.correct).length);
    percentage = $derived(
        this.totalQuestions === 0 ? 0 : Math.round((this.score / this.totalQuestions) * 100)
    );

    private quizIntervalId: null | number = null;

    async loadQuestions() {
        this.loading = true;
        this.errorMessage = null;
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

        const updatedAnswers = new Map(this.answers)
        updatedAnswers.delete(id)
        this.answers = updatedAnswers
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
        this.stopTimer();
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
