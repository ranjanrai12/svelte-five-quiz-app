<script lang="ts">
    import { goto } from "$app/navigation";
    import { quiz } from "$lib/state/quiz.svelte";
    import type { QuizQuestion, QuizResult } from "$lib/types/quiz";
    import { formatTime } from "$lib/utils/time";

    function checkAnswer(question: QuizQuestion, answer: string | string[]): boolean {
        switch (question.type) {
            case "multiple": {
                const correct = [...question.correctAnswer].sort();
                const selected = [...(answer as string[])].sort();
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

    const results = $derived<QuizResult[]>(
        quiz.allQuestions.map((question) => {
            const userAnswer = quiz.answers.get(question.id) ?? "";
            return {
                question,
                userAnswer,
                correct: checkAnswer(question, userAnswer),
            };
        }),
    );

    const score = $derived(results.filter((r) => r.correct).length);
    const percentage = $derived(Math.round((score / quiz.allQuestions.length) * 100));

    function handleRetake() {
        quiz.resetQuiz();
        goto("/quiz");
    }

    function handleGoHome() {
        goto("/");
    }
</script>

<section class="results">
    <div class="summary">
        <h2>
            You scored {score} / {quiz.allQuestions.length}
            <span class="percentage">({percentage}%)</span>
        </h2>
        <p class="time">Completed in {formatTime(quiz.timeElapsed)}</p>
    </div>

    <ol class="breakdown">
        {#each results as result, i}
            <li class="result-item {result.correct ? 'result-item--correct' : 'result-item--wrong'}">
                <p class="question-text">{i + 1}. {result.question.question}</p>
                <p class="answer-row">
                    <span class="label">Your answer:</span>
                    <span>
                        {Array.isArray(result.userAnswer)
                            ? result.userAnswer.join(", ")
                            : result.userAnswer || "—"}
                    </span>
                </p>
                {#if !result.correct}
                    <p class="answer-row">
                        <span class="label">Correct answer:</span>
                        <span>
                            {Array.isArray(result.question.correctAnswer)
                                ? result.question.correctAnswer.join(", ")
                                : result.question.correctAnswer}
                        </span>
                    </p>
                {/if}
            </li>
        {/each}
    </ol>

    <div class="actions">
        <button onclick={handleRetake}>Retake Quiz</button>
        <button class="secondary" onclick={handleGoHome}>Go Home</button>
    </div>
</section>

<style>
    .results {
        max-width: 680px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .summary {
        text-align: center;
    }

    .summary h2 {
        font-size: 1.75rem;
        font-weight: 700;
    }

    .percentage {
        font-size: 1.25rem;
        font-weight: 400;
        color: var(--text-muted);
    }

    .time {
        color: var(--text-muted);
        margin-top: 0.25rem;
    }

    .breakdown {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .result-item {
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid;
    }

    .result-item--correct {
        background: var(--correct-bg);
        border-color: var(--correct);
    }

    .result-item--wrong {
        background: var(--error-bg);
        border-color: var(--error);
    }

    .question-text {
        font-weight: 500;
        margin-bottom: 0.4rem;
    }

    .answer-row {
        font-size: 0.9rem;
        color: var(--primary-hover);
        display: flex;
        gap: 0.4rem;
    }

    .label {
        color: var(--text-muted);
    }

    .actions {
        display: flex;
        gap: 0.75rem;
    }

    button {
        padding: 0.65rem 1.5rem;
        border: none;
        border-radius: 6px;
        background: var(--primary);
        color: white;
        font-size: 0.95rem;
        cursor: pointer;
    }

    button:hover {
        background: var(--primary-hover);
    }

    button.secondary {
        background: var(--border);
        color: var(--primary);
    }

    button.secondary:hover {
        background: var(--border-strong);
    }
</style>
