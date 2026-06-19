<script lang="ts">
    import { goto } from "$app/navigation";
    import { quiz } from "$lib/state/quiz.svelte";
    import { formatTime } from "$lib/utils/time";
    import { ROUTES } from "$lib/constants/routes";

    function handleRetake() {
        quiz.resetQuiz();
        goto(ROUTES.quiz);
    }

    function handleGoHome() {
        goto(ROUTES.home);
    }
</script>

<section class="results">
    <div class="summary">
        <h2>
            You scored {quiz.score} / {quiz.totalQuestions}
            <span class="percentage">({quiz.percentage}%)</span>
        </h2>
        <p class="time">Completed in {formatTime(quiz.timeElapsed)}</p>
    </div>

    <ol class="breakdown">
        {#each quiz.results as result, i}
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
