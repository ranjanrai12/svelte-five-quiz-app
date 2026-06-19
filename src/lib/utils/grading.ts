import type { QuizQuestion } from "$lib/types/quiz";

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
