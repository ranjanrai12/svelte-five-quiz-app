import type { QuizQuestion, QuizResult } from "$lib/types/quiz";

type AnswerMap = Map<number, string | string[]>;

export function gradeAnswer(question: QuizQuestion, answer: string | string[]): boolean {
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

export function buildResults(questions: QuizQuestion[], answers: AnswerMap): QuizResult[] {
    return questions.map((question) => {
        const userAnswer = answers.get(question.id) ?? "";
        return {
            question,
            userAnswer,
            correct: gradeAnswer(question, userAnswer),
        };
    });
}

export function calculateScore(results: QuizResult[]): number {
    return results.filter((result) => result.correct).length;
}

export function calculatePercentage(score: number, total: number): number {
    return total === 0 ? 0 : Math.round((score / total) * 100);
}
